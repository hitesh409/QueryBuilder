using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.RequestModel;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.VisualBasic;
using OfficeOpenXml;
using System.Data;
namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuerysController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly QueryBuilderContext _context;
        private readonly DatabaseConnectionService _databaseConnection;
        private readonly IMemoryCache _memoryCache;

        public QuerysController(IAuthService authService,QueryBuilderContext context,DatabaseConnectionService databaseConnection, IMemoryCache memoryCache)
        {
            this._authService = authService;
            this._context = context;
            this._memoryCache = memoryCache;
            this._databaseConnection = databaseConnection;
        }

        [HttpPost]
        public async Task<IActionResult> StoreQuery([FromBody] QueryModel queryModel)
        {
            if (queryModel == null)
                return BadRequest("Invalid Request");

            var userIdClaim = User.FindFirst("Id");

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return BadRequest("Invalid or missing 'UserId' claim");
            }

            List<Dataset> datasets;
            datasets = await _context.Datasets.Where(d=>d.UserId == userId).ToListAsync();

            if (queryModel.DatasetId != Guid.Empty && !datasets.Any(d => d.Id == queryModel.DatasetId))
            {
                return NotFound("Dataset not found for the user.");
            }

            Guid datasetId;
            if (queryModel.DatasetId != Guid.Empty)
            {
                datasetId = queryModel.DatasetId;
            }
            else
            {
                return BadRequest("Missing Dataset");
            }

            var query = new Query
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                DatasetId = datasetId,
                SavedAt = DateTime.UtcNow,
                QueryName = queryModel.QueryName,
                QueryText = queryModel.QueryText,
            };

            await _context.Queries.AddAsync(query);
            await _context.SaveChangesAsync();

            return Ok(query);
        }

        [HttpPost("preview")]
        public async Task<IActionResult> PreviewQuery([FromBody] PreviewQueryModel previewQuery)
        {
            if (previewQuery == null || string.IsNullOrEmpty(previewQuery.QueryText))
            {
                return BadRequest("Invalid Request");
            }

            var userIdClaim = User.FindFirst("Id");

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return BadRequest("Invalid or missing 'UserId' claim");
            }

            List<Dataset> datasets;
            datasets = await _context.Datasets.Where(d => d.UserId == userId).ToListAsync();

            if (previewQuery.DatasetId != Guid.Empty && !datasets.Any(d => d.Id == previewQuery.DatasetId))
            {
                return NotFound("Dataset not found for the user.");
            }

            Guid datasetId;
            if (previewQuery.DatasetId != Guid.Empty)
            {
                datasetId = previewQuery.DatasetId;
            }
            else
            {
                return BadRequest("Missing Dataset");
            }

            // caching
            string cacheKey = $"query_{previewQuery.QueryText}_{datasetId}";
            var cache = _memoryCache.Get<List<object>>(cacheKey);

            if (cache != null)
            {
                return Ok(cache);
            }

            var location = _context.Datasets.Where(d => d.Id == datasetId).Select(d => d.Location).FirstOrDefault();
            if (location == null)
            {
                return BadRequest("Dataset Not found for the user");
            }



            //try
            //{
                using (var file = System.IO.File.OpenRead(location))
                {
                    using (var package = new ExcelPackage(file))
                    {
                        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                        var connection = await _databaseConnection.OpenConnectionAsync();
                    foreach (var worksheet in package.Workbook.Worksheets)
                    {
                        var tableName = worksheet.Name;
                        var data = await ReadAndParseExcelData(worksheet);

                        // Create temporary table based on Excel data
                        await CreateTemporaryTable(connection, tableName, data);

                        // Insert data into the temporary table
                        await InsertDataIntoTable(connection, tableName, data);
                    }
                    //await CreateTemporaryTableFromData(connection, package);

                        var results = await ExecuteQueryAsync(previewQuery.QueryText, datasetId,connection);
                        _memoryCache.Set(cacheKey, results, new MemoryCacheEntryOptions
                        {
                            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                        });
                        return Ok(results);
                        //return Ok();
                    }
                }
            //}

            //catch (Exception ex)
            //{
            //    return BadRequest($"Error parsing Excel data: {ex.Message}");
            //}





        }
        private async Task CreateTemporaryTable(SqliteConnection connection, string tableName, Dictionary<string, List<object>> data)
        {
            // Create temporary table based on Excel data
            await connection.OpenAsync();
            var createStatement = $"CREATE TABLE IF NOT EXISTS {tableName} (";
            createStatement += string.Join(",", data.Keys.Select(x => $"{x} TEXT"));
            createStatement += ")";
            System.Diagnostics.Debug.WriteLine(createStatement);
            await ExecuteNonQueryAsync(connection, createStatement);
        }

        private async Task<List<object>> ExecuteQueryAsync(string queryText, Guid datasetId,SqliteConnection connection)
        {
            System.Diagnostics.Debug.WriteLine("ExecuteQueryAsync");

                System.Diagnostics.Debug.WriteLine("chech1");
                var command = new SqliteCommand(queryText, connection);
                System.Diagnostics.Debug.WriteLine("chech2");
                var results = new List<object>();
                System.Diagnostics.Debug.WriteLine("chech3");
                try
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        System.Diagnostics.Debug.WriteLine($"check4 {reader.HasRows}");
                    while (reader.Read())
                    {
                        var row = new List<object>();
                        bool hasValues = false;
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            var value = reader.GetValue(i);
                            row.Add(value);
                            if (value != DBNull.Value && !string.IsNullOrEmpty(value.ToString()))
                            {
                                hasValues = true;
                            }
                        }
                        if (hasValues)
                        {
                            results.Add(row);
                        }
                    }
                }
                }
                catch (Exception ex)
                {
                    // Log the exception
                    System.Diagnostics.Debug.WriteLine($"Exception: {ex.Message}");
                    throw; // Rethrow the exception
                }

                return results;
            
        }

        private async Task InsertDataIntoTable(SqliteConnection connection, string tableName, Dictionary<string, List<object>> data)
        {
            System.Diagnostics.Debug.WriteLine("InsertDataIntoTable");
            foreach (var keyValuePair in data)
            {
                var columnNames = string.Join(",", keyValuePair.Key);
                System.Diagnostics.Debug.WriteLine($"table names {tableName}");

                foreach (var value in keyValuePair.Value) // Loop through each value in the current column
                {
                    var parameterName = "@" + keyValuePair.Key; // Parameter name for the current column
                    var insertStatement = $"INSERT INTO {tableName} ({keyValuePair.Key}) VALUES ({parameterName})";
                    System.Diagnostics.Debug.WriteLine($"Insert Statement: {insertStatement}");

                    using (var command = new SqliteCommand(insertStatement, connection))
                    {
                        command.Parameters.AddWithValue(parameterName, value); // Add parameter for the current value
                        System.Diagnostics.Debug.WriteLine($"Parameter Name: {parameterName}, Value: {value}");

                        await command.ExecuteNonQueryAsync();
                    }
                }
            }
        }

        private async Task ExecuteNonQueryAsync(SqliteConnection connection, string sql)
        {
            System.Diagnostics.Debug.WriteLine("ExecuteNonQueryAsync");
            using (var command = new SqliteCommand(sql, connection))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        private Task<Dictionary<string, List<object>>> ReadAndParseExcelData(ExcelWorksheet worksheet)
        {
            System.Diagnostics.Debug.WriteLine("ReadAndParseExcelData");

            if (worksheet.Cells[1, 1, 1, worksheet.Dimension.End.Column].All(cell => cell.Value == null))
                {
                    throw new Exception("Excel file missing header row");
                }

                var headerRowIndex = 1;
                var columnNames = new List<string>();
                for (int col = 1; col <= worksheet.Dimension.End.Column; col++)
                {
                    var columnName = worksheet.Cells[headerRowIndex, col].Value?.ToString();
                    columnName = columnName.Trim();
                    if (string.IsNullOrEmpty(columnName))
                    {
                        throw new Exception($"Invalid column name in cell {headerRowIndex},{col}");
                    }
                    columnNames.Add(columnName);
                }

                var data = new Dictionary<string, List<object>>();
                foreach (var columnName in columnNames)
                {
                    data[columnName] = new List<object>();
                }
                for (int row = headerRowIndex + 1; row <= worksheet.Dimension.End.Row; row++)
                {
                    for (int col = 0; col < columnNames.Count; col++)
                    {
                        data[columnNames[col]].Add(worksheet.Cells[row, col + 1].Value);
                    }
                }

                return Task.FromResult(data);
            
        }
    }
}
