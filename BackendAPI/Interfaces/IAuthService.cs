using BackendAPI.Models;
using BackendAPI.RequestModel;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;                         

namespace BackendAPI.Interfaces
{
    public interface IAuthService
    {
        Task<User> AddUser(RegisterModel registerModel);
        Task<object> Login(LoginModel loginModel);
    }
}
