using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    }
}

