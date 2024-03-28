using Microsoft.Data.Sqlite;
namespace BackendAPI.Services
{
    public class DatabaseConnectionService
    {
        private readonly string _connectionString = "Data Source=:memory:";
        public async Task<SqliteConnection> OpenConnectionAsync()
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                await connection.OpenAsync();
                return connection;
            }
        }
    }
}
