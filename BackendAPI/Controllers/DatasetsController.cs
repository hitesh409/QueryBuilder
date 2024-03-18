using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Runtime.InteropServices.Marshalling;
using System.Security.Claims;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DatasetsController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly QueryBuilderContext _context;
        private readonly string _datasetStoragePath = Path.Combine(@"C:\Users\HET\Desktop\Datasets", "Datasets");

        public DatasetsController(IAuthService authService,QueryBuilderContext context)
        {
            this._authService = authService;
            this._context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadDataset([FromForm] IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("No file uploaded");
            }



            //var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var userIdClaim = User.FindFirst("Id");

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return BadRequest("Invalid or missing 'UserId' claim");
            }

            var fileName = $"{userId}_{DateTime.UtcNow.ToString("yyyyMMddHHmmss")}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(_datasetStoragePath, fileName);

            
            Directory.CreateDirectory(_datasetStoragePath);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            
            var dataset = new Dataset
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = file.FileName,
                UploadedAt = DateTime.UtcNow,
                Location = filePath,
            };

            await _context.Datasets.AddAsync(dataset);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Dataset uploaded successfully!" });
        }

        [HttpPost("Segregation")]
        public async Task<IActionResult> SegregateTablesAndColumns(Guid datasetId)
        {
            
            try
            {
                var userIdClaim = User.FindFirst("Id");

                if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
                {
                    return BadRequest("Invalid or missing 'UserId' claim");
                }

                List<Dataset> datasets;
                datasets = await _context.Datasets.Where(d=>d.UserId == userId).ToListAsync();
                if(datasetId != Guid.Empty && !datasets.Any(d=>d.Id == datasetId)) 
                {
                    return BadRequest("Invalid Dataset for user");
                }

                var fileData = await GetFileData(datasetId);

                if(fileData == null)
                {
                    return NotFound("No file found");
                }

                using (var stream = new MemoryStream(fileData))
                {
                    var tables = ParseExcelFile(stream);
                    return Ok(tables);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error parsing dataset:{ex.Message}");
            }
        }

        private async Task<byte[]> GetFileData(Guid datasetId)
        {
            var dataset = await _context.Datasets.FirstOrDefaultAsync(x => x.Id == datasetId);
            if(dataset == null)
            {
                return null;
            }
            return System.IO.File.ReadAllBytes(dataset.Location);
        }

        private List<TableInfo> ParseExcelFile(Stream stream)
        {
            List<TableInfo> tables = new List<TableInfo>();
            using (var package = new OfficeOpenXml.ExcelPackage(stream))
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                foreach (var worksheet in package.Workbook.Worksheets)
                {
                    var tableName = worksheet.Name;
                    var columnNames = worksheet.Cells[1, 1, 1, worksheet.Dimension.End.Column].Select(c => c.Text).ToList();
                    tables.Add(new TableInfo { TableName = tableName, ColumnNames = columnNames });
                }
            }
            return tables;
        }
    }
}

