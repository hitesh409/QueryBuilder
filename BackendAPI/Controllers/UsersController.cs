using BackendAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QueryBuilderContext context;

        public UsersController(QueryBuilderContext context)
        {
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel register)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray());
            }
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = register.UserName,
                Email = register.Email,
                CreatedAt = DateTime.UtcNow,
            };

            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(register.Password,salt);

            user.PasswordHash = passwordHash;

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }
    }
}

public class RegisterModel
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}
