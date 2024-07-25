using Crab_API.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Security.Cryptography;
namespace Crab_API.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;
        public UserService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<User>(crabDatabaseSetting.Value.UsersCollectionName);
        }
        public async Task<List<User>> GetAsync() =>
            await _userCollection.Find(_ => true).ToListAsync();
        public async Task<User?> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<User> CreateASync(User user)
        {
            user.PasswordHash = CreatePasswordHash(user.Password);
            await _userCollection.InsertOneAsync(user);
            return user;
        }
            
        public async Task UpdateAsync(string id, User updatedUser) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);
        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<User?> GetByEmail(string email) =>
            await _userCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _userCollection.Find(x => x.Email == username).FirstOrDefaultAsync();
            if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
            {
                return null;
            }
            return user;
        }
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            byte[] hashBytes = Convert.FromBase64String(storedHash);
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(20);  // Length of the hash part
                for (int i = 0; i < 20; i++)  // Compare the result hash with the stored hash
                {
                    if (hashBytes[i + 16] != hash[i])
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private string CreatePasswordHash(string password)
        {
            // Generate a random salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password along with the salt
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(20); // Creates a 20-byte hash

                // Combine the salt and hash to store them together
                byte[] hashBytes = new byte[36];
                Array.Copy(salt, 0, hashBytes, 0, 16);
                Array.Copy(hash, 0, hashBytes, 16, 20);

                // Convert the combined salt and hash to a base64 string
                string savedPasswordHash = Convert.ToBase64String(hashBytes);
                return savedPasswordHash;
            }
        }
    }
}
