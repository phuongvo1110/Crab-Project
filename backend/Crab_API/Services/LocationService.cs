using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Crab_API.Services
{
    public class LocationService
    {
        private readonly IMongoCollection<Location> _locationCollection;
        public LocationService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _locationCollection = mongoDatabase.GetCollection<Location>(crabDatabaseSetting.Value.LocationCollectionName);
        }
        public async Task<List<Location>> GetAsync() =>
            await _locationCollection.Find(_ => true).ToListAsync();

        public async Task<Location> GetAsync(string id) =>
            await _locationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Location location) =>
            await _locationCollection.InsertOneAsync(location);

        public async Task UpdateAsync(string id, Location updatedLocation) =>
            await _locationCollection.ReplaceOneAsync(x => x.Id == id, updatedLocation);

        public async Task RemoveAsync(string id) =>
            await _locationCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<Location> GetByLatLongAsync(float longtitude, float latitude)
        {
            return await _locationCollection.Find(x => x.Longtitude == longtitude && x.Latitude == latitude).FirstOrDefaultAsync();
        }
    }
}
