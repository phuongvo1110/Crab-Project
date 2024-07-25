using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace Crab_API.Services
{
    public class CallCenterAgentService
    {
        private readonly IMongoCollection<CallCenterAgent> _callCenterAgentCollection;
        public CallCenterAgentService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _callCenterAgentCollection = mongoDatabase.GetCollection<CallCenterAgent>(crabDatabaseSetting.Value.CallCenterAgentsCollectionName);
        }
        public async Task<List<CallCenterAgent>> GetAsync() =>
            await _callCenterAgentCollection.Find(_ => true).ToListAsync();
        public async Task<CallCenterAgent?> GetAsync(string id) =>
            await _callCenterAgentCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateASync(CallCenterAgent agent) =>
            await _callCenterAgentCollection.InsertOneAsync(agent);
        public async Task UpdateAsync(string id, CallCenterAgent updatedAgent) =>
            await _callCenterAgentCollection.ReplaceOneAsync(x => x.Id == id, updatedAgent);
        public async Task RemoveAsync(string id) =>
            await _callCenterAgentCollection.DeleteOneAsync(x => x.Id == id);
    }
}
