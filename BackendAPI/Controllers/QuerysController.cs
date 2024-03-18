using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.RequestModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuerysController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly QueryBuilderContext _context;

        public QuerysController(IAuthService authService,QueryBuilderContext context)
        {
            this._authService = authService;
            this._context = context;
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

            var query = new Models.Query
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


    }
}
