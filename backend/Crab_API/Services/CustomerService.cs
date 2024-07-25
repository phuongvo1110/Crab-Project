using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Crab_API.Services
{
    public class CustomerService
    {
        private readonly IMongoCollection<Customer> _customerCollection;
        public CustomerService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _customerCollection = mongoDatabase.GetCollection<Customer>(crabDatabaseSetting.Value.CustomersCollectionName);
        }
        public async Task<List<Customer>> GetAsync() => 
            await _customerCollection.Find(_ => true).ToListAsync();
        public async Task<Customer?> GetAsync(string id) =>
            await _customerCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateASync(Customer customer) =>
            await _customerCollection.InsertOneAsync(customer);
        public async Task UpdateAsync(string id, Customer updatedCustomer) =>
            await _customerCollection.ReplaceOneAsync(x => x.Id == id, updatedCustomer);
        public async Task RemoveAsync(string id) =>
            await _customerCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<Customer?> GetByEmail(string email) =>
            await _customerCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
    }
}
