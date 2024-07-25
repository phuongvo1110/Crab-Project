using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace Crab_API.Services
{
    public class AdminService
    {
        private readonly IMongoCollection<Admin> _adminCollection;
        public AdminService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _adminCollection = mongoDatabase.GetCollection<Admin>(crabDatabaseSetting.Value.AdminsCollectionName);
        }
        public async Task<List<Admin>> GetAsync() =>
            await _adminCollection.Find(_ => true).ToListAsync();
        public async Task<Admin?> GetAsync(string id) =>
            await _adminCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateASync(Admin admin) =>
            await _adminCollection.InsertOneAsync(admin);
        public async Task UpdateAsync(string id, Admin updatedAdmin) =>
            await _adminCollection.ReplaceOneAsync(x => x.Id == id, updatedAdmin);
        public async Task RemoveAsync(string id) =>
            await _adminCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<Admin?> GetByEmail(string email) =>
            await _adminCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
    }
}
