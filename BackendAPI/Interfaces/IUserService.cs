using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IUserService
    {
        public List<User> GetUsersDetails();
        public User GetUserById(Guid id);
        public User AddUser(User user);
        public User UpdateUser(User user);
        public bool DeleteUser(Guid userId);
    }
}
