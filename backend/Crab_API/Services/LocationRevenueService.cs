using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Crab_API.Services
{
    public class LocationRevenueService
    {
        private readonly IMongoCollection<LocationRevenue> _locationRevenueCollection;
        public LocationRevenueService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _locationRevenueCollection = mongoDatabase.GetCollection<LocationRevenue>(crabDatabaseSetting.Value.LocationRevenueCollectionName);
        }
        public async Task<List<LocationRevenue>> GetAsync() =>
            await _locationRevenueCollection.Find(_ => true).ToListAsync();

        public async Task<LocationRevenue> GetAsync(string id) =>
            await _locationRevenueCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(LocationRevenue location) =>
            await _locationRevenueCollection.InsertOneAsync(location);

        public async Task UpdateAsync(string id, LocationRevenue updatedLocationRevenue) =>
            await _locationRevenueCollection.ReplaceOneAsync(x => x.Id == id, updatedLocationRevenue);

        public async Task RemoveAsync(string id) =>
            await _locationRevenueCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<(bool, string)> CheckExist(string city)
        {
            var filter = Builders<LocationRevenue>.Filter.Eq(x => x.City, city);
            var location = await _locationRevenueCollection.Find(filter).FirstOrDefaultAsync();
            if (location == null)
            {
                return (false, "");
            } else
            {
                return (true, location.Id);
            }
        }
    }
}
