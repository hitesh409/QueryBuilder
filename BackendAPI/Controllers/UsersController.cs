using BackendAPI.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QueryBuilderContext _context;
        private readonly IConfiguration _config;

        public UsersController(QueryBuilderContext context,IConfiguration config)
        {
            this._context = context;
            this._config = config;
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

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        
        public async Task<IActionResult> LoginUser([FromBody] LoginModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e=>e.Errors).Select(e=>e.ErrorMessage).ToArray());
            }

            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Username == login.Username);
            if(user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password,user.PasswordHash);

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credential");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Sectoken = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return Ok(token);

        }
    }
}

public class RegisterModel
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}

public class LoginModel
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}
