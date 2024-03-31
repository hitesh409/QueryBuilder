using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.RequestModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly QueryBuilderContext _context;
        private readonly IConfiguration configuration;

        public AuthService(QueryBuilderContext context,IConfiguration configuration)
        {
            this._context = context;
            this.configuration = configuration;
        }
        public async Task<User> AddUser(RegisterModel registerModel)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = registerModel.UserName,
                Email = registerModel.Email,
                CreatedAt = DateTime.UtcNow,
            };

            var salt = BCrypt.Net.BCrypt.GenerateSalt();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerModel.Password, salt);

            user.PasswordHash = passwordHash;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<string> Login(LoginModel loginModel)
        {
            if(loginModel.Email != null && loginModel.Password!=null) 
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);
                if (user == null)
                {
                    throw new Exception("Invalid credential");
                }

                var isPasswordValid = BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash);

                if (!isPasswordValid)
                {
                    throw new Exception("Invalid credential");
                }
                
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]),
                    new Claim("Id",user.Id.ToString()),
                    new Claim("UserName",user.Username),
                    new Claim("Email",user.Email),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(200),
                        signingCredentials: signIn
                    );
                return (new JwtSecurityTokenHandler().WriteToken(token));
               
            }
            else
            {
                throw new Exception("User is not Valid");
            }
        }
    }
}
