using BackendAPI.Interfaces;
using BackendAPI.Models;

namespace BackendAPI.Services
{
    public class UserService : IUserService
    {
        private readonly QueryBuilderContext _context;

        public UserService(QueryBuilderContext context)
        {
            this._context = context;
        }
        public User AddUser(User user)
        {
            var userEntity = _context.Users.Add(user);
            _context.SaveChanges();
            return userEntity.Entity;
        }

        public bool DeleteUser(Guid userId)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(s => s.Id == userId);
                if ( user == null)
                {
                    throw new Exception("User not Found");
                }
                else
                {
                    _context.Users.Remove(user);
                    _context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public User GetUserById(Guid id)
        {
            var user = _context.Users.SingleOrDefault(s => s.Id == id);
            return user;
        }

        public List<User> GetUsersDetails()
        {
            var users = _context.Users.ToList();
            return users;
        }

        public User UpdateUser(User user)
        {
            var updatedUser = _context.Users.Update(user);
            _context.SaveChanges();
            return updatedUser.Entity;
        }
    }
}
