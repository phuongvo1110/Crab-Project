using Amazon.Runtime.Documents;
using Crab_API.DTOs;
using Crab_API.Interfaces;
using Crab_API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using static Crab_API.Models.DriverBooking;

namespace Crab_API.Services
{
    public class DashboardService
    {
        private readonly IMongoCollection<DriverBooking> _driverBookingCollection;
        private readonly IMongoCollection<Location> _locationCollection;
        private readonly IMongoCollection<LocationRevenue> _locationRevenueCollection;
        public DashboardService(IOptions<CrabDatabaseSetting> crabDatabaseSetting)
        {
            var mongoClient = new MongoClient(crabDatabaseSetting.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(crabDatabaseSetting.Value.DatabaseName);
            _driverBookingCollection = mongoDatabase.GetCollection<DriverBooking>(crabDatabaseSetting.Value.DriverBookingCollectionName);
            _locationCollection = mongoDatabase.GetCollection<Location>(crabDatabaseSetting.Value.LocationCollectionName);
            _locationRevenueCollection = mongoDatabase.GetCollection<LocationRevenue>(crabDatabaseSetting.Value.LocationRevenueCollectionName);
        }
        public async Task<int> GetTotalMotobikeRidesAsync()
        {
            var filter = Builders<DriverBooking>.Filter.Eq(x => x.Vehicle, 0);
            var count = await _driverBookingCollection.CountDocumentsAsync(filter);
            return (int)count;
        }

        public async Task<int> GetTotalCarDrivesAsync()
        {
            var filter = Builders<DriverBooking>.Filter.Eq(x => x.Vehicle, 1);
            var count = await _driverBookingCollection.CountDocumentsAsync(filter);
            return (int)count;
        }

        public async Task<int> GetTotalRidesAsync(DateTime month)
        {
            var startDate = new DateTime(month.Year, month.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            var filter = Builders<DriverBooking>.Filter.And(Builders<DriverBooking>.Filter.Gte(x => x.Date, startDate), Builders<DriverBooking>.Filter.Lte(x => x.Date, endDate));
            var count = await _driverBookingCollection.CountDocumentsAsync(filter);
            return (int)count;
        }
        public async Task<float> GetSuccessRidesPercent()
        {
            long successfulBookings = await _driverBookingCollection.CountDocumentsAsync(
                Builders<DriverBooking>.Filter.Eq(x => x.StatusType, DriverBooking.BookingStatus.Success));
            var totalEnum = await _driverBookingCollection.CountDocumentsAsync(FilterDefinition<DriverBooking>.Empty);
            float successRate = (float)successfulBookings / totalEnum * 100;
            return successRate;
        }
        public async Task<List<DriverBooking>> GetListRangeTime(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<DriverBooking>.Filter.And(Builders<DriverBooking>.Filter.Gte(x => x.Date, startDate), Builders<DriverBooking>.Filter.Lte(x => x.Date, endDate));
            var listBooking = await _driverBookingCollection.Find(filter).ToListAsync();
            return listBooking;
        }
        public async Task<float> GetRevenueInRange(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<DriverBooking>.Filter.And(Builders<DriverBooking>.Filter.Gte(x => x.Date, startDate), Builders<DriverBooking>.Filter.Lte(x => x.Date, endDate));
            var listBooking = await _driverBookingCollection.Find(filter).ToListAsync();
            float totalRevenue = 0;
            foreach(var booking in listBooking)
            {
                totalRevenue += booking.Price;
            }
            return totalRevenue;
        }
        /*public async Task<float> GetHightestRevenueProvince(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<DriverBooking>.Filter.And(Builders<DriverBooking>.Filter.Gte(x => x.Date, startDate), Builders<DriverBooking>.Filter.Lte(x => x.Date, endDate));
            var listBooking = await _driverBookingCollection.Find(filter).ToListAsync();
            var listLocation = new List<Location>();
            var listLocationRevenue = new List<LocationRevenue>();
            foreach (var booking in listBooking)
            {
                var location = await
            }
        }*/
        public async Task<List<RevenueDto>> GetRevenueProfitAsync(DateTime startDate, DateTime endDate){
            var revenue = new List<RevenueDto>();
            var bookings = await _driverBookingCollection.Find(x => x.Date >= startDate && x.Date <= endDate).ToListAsync();
            var monthlyBookings = bookings.GroupBy(x => new {x.Date.Value.Year, x.Date.Value.Month});
            foreach (var monthlyGroup in monthlyBookings){
                float totalRevenue = 0;
                float totalProfit = 0;
                foreach (var booking in monthlyGroup) {
                    totalRevenue += booking.Price;
                    float profit = (float)(booking.Price * 0.3);
                    totalProfit += profit;
                }
                revenue.Add(new RevenueDto {
                    Revenue = totalRevenue,
                    Profit = totalProfit
                });
            }
            return revenue;
        }
    }
}
