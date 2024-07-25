using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Crab_API.Models;
using MongoDB.Bson.IO;

namespace Crab_API.Services
{
    public class DriverBookingService
    {
        private readonly IMongoCollection<DriverBooking> _driverBookingCollection;

        public DriverBookingService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _driverBookingCollection = mongoDatabase.GetCollection<DriverBooking>(crabDatabaseSetting.Value.DriverBookingCollectionName);
        }

        public async Task<List<DriverBooking>> GetAsync() =>
            await _driverBookingCollection.Find(_ => true).ToListAsync();

        public async Task<DriverBooking> GetAsync(string id) =>
            await _driverBookingCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(DriverBooking driverBooking) =>
            await _driverBookingCollection.InsertOneAsync(driverBooking);

        public async Task UpdateAsync(string id, DriverBooking updatedDriverBooking) =>
            await _driverBookingCollection.ReplaceOneAsync(x => x.Id == id, updatedDriverBooking);

        public async Task RemoveAsync(string id) =>
            await _driverBookingCollection.DeleteOneAsync(x => x.Id == id);
        public async Task<List<DriverBooking>> GetByCustID(string custID) => 
            await _driverBookingCollection.Find(x => x.CustomerId == custID).ToListAsync();
        public async Task<List<DriverBooking>> GetByDriverID(string driverID) =>
            await _driverBookingCollection.Find(x => x.DriverID == driverID).ToListAsync();
        public async Task<DriverBooking> GetByDriverIDLatest(string driverID)
        {
            var filter = Builders<DriverBooking>.Filter.Eq(x => x.DriverID, driverID) & Builders<DriverBooking>.Filter.Eq(x => x.StatusType, DriverBooking.BookingStatus.Processing);
            var sort = Builders<DriverBooking>.Sort.Descending(x => x.Date);
            return await _driverBookingCollection.Find(filter).Sort(sort).FirstOrDefaultAsync();
        }

        private float GetPricePerKm(int? vehicle)
        {
            switch (vehicle)
            {
                case (int)DriverBooking.VehicleType.Motorbike:
                    return (float)0.5;
                case (int)DriverBooking.VehicleType.Car:
                    return (float)1.59;
                default:
                    throw new ArgumentException("Invalid vehicle type.");
            }
        }
        public float GetTotalPrice(int? vehicle, float distance)
        {
            float priceperkm = GetPricePerKm(vehicle);
            float totalPrice = 0;
            float remainingDistance = distance;
            if (vehicle == 0)
            {
                while (remainingDistance > 0)
                {
                    float priceForCurrentKm = Math.Min(1, remainingDistance) * priceperkm;
                    totalPrice += priceForCurrentKm;
                    remainingDistance -= 1;
                    priceperkm += (float)0.2;
                }
                return totalPrice;
            }
            else if (vehicle == 1)
            {
                while (remainingDistance > 0)
                {
                    float priceForCurrentKm = Math.Min(1, remainingDistance) * priceperkm;
                    totalPrice += priceForCurrentKm;
                    remainingDistance -= 1;
                    priceperkm += (float)0.49;
                }
                return totalPrice;
            }
            return 0;
        }
    }
}
