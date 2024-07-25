using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using Newtonsoft.Json;
using JsonConvert = Newtonsoft.Json.JsonConvert;
namespace Crab_API.Services
{
    public class DriverService
    {
        private readonly HttpClient _httpClient;
        private readonly IMongoCollection<Driver> _driverCollection;
        public DriverService(IOptions<CrabDatabaseSetting> crabDatabaseSetting, HttpClient httpClient)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _driverCollection = mongoDatabase.GetCollection<Driver>(crabDatabaseSetting.Value.DriversCollectionName);
            _httpClient = httpClient;
        }
        public async Task<List<Driver>> GetAsync() =>
            await _driverCollection.Find(_ => true).ToListAsync();
        public async Task<Driver?> GetAsync(string id) =>
            await _driverCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task CreateASync(Driver driver) =>
            await _driverCollection.InsertOneAsync(driver);
        public async Task UpdateAsync(string id, Driver updatedDriver) =>
            await _driverCollection.ReplaceOneAsync(x => x.Id == id, updatedDriver);
        public async Task RemoveAsync(string id) =>
            await _driverCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<Driver?> GetByEmail(string email) =>
            await _driverCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        public async Task UpdateLocationAsync(string driverId, float newLatitude, float newLongtitude){
            var filter = Builders<Driver>.Filter.Eq(d => d.Id, driverId);
            var update = Builders<Driver>.Update.Set(d => d.Latitude, newLatitude).Set(d => d.Longtitude, newLongtitude);
            await _driverCollection.UpdateOneAsync(filter, update);
        }
        public async Task<Driver?> FindNearestDriverAsync(float pickupLatitude, float pickupLongtitude){    
            List<(float? Latitude, float? Longtitude)> driverLocations = [];
            var drivers = await GetAsync();
            foreach (var driver in drivers){
                var location = (driver.Latitude, driver.Longtitude);
                driverLocations.Add(location);
            }
            var origins = $"{pickupLatitude}%2C{pickupLongtitude}";
            var destinations = string.Join("%7C", driverLocations.Select(loc => $"{loc.Latitude}%2C{loc.Longtitude}"));
            var apiKey = "AIzaSyASxnC-x5mZ_GKgaBz7sSGUhSGqr_xQWGc";
            var apiUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?destinations={destinations}&origins={origins}&key={apiKey}";
            try {
                var response = await _httpClient.GetAsync(apiUrl);
                response.EnsureSuccessStatusCode();
                var jsonString = await response.Content.ReadAsStringAsync();
                dynamic data = JsonConvert.DeserializeObject(jsonString);

                var rows = data.rows;
                var nearestDriverIndex = -1;
                float minDistance = rows[0].elements[0].distance.value;
                for (int i = 0; i< rows[0].elements.Count; i++) {
                    var elements = rows[0].elements;
                    if (elements[i].status == "OK") {
                        var distance = elements[i].distance.value;
                        if (distance <= minDistance) {
                            minDistance = distance;
                            nearestDriverIndex = i;
                        }
                    }
                }
                if (nearestDriverIndex != -1) {
                    var nearestDriver = driverLocations[nearestDriverIndex];
                    return await _driverCollection.Find(x => x.Latitude == nearestDriver.Latitude && x.Longtitude == nearestDriver.Longtitude).FirstOrDefaultAsync();
                } else {
                    return null;
                }
            } catch (Exception ex){
                Console.WriteLine($"An error occurred: {ex.Message}");
                return null;
            }
        }
    }
}
