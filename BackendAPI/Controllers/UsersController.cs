using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.RequestModel;
using BackendAPI.Services;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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

        private readonly IAuthService _authService;

        public UsersController(IAuthService authService)
        {
            
            this._authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel register)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e => e.Errors).Select(e => e.ErrorMessage).ToArray());
            }
            try
            {
                var user = await _authService.AddUser(register);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex);
            }
        }

        [EnableCors("myAppCors")]               
        [HttpPost("login")]
        
        public async Task<IActionResult> LoginUser([FromBody] LoginModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Values.SelectMany(e=>e.Errors).Select(e=>e.ErrorMessage).ToArray());
            }

            try
            {
                var token =await _authService.Login(login);

                return Ok(token);
            }
            catch (Exception ex)
            {
                if (ex.Message == "Invalid credential")
                {
                    return Unauthorized( "Invalid email or password. Please try again." );
                }

                // Generic server error response
                return StatusCode(500,  "An unexpected error occurred. Please try again later." );
            }


        }
    }
}


