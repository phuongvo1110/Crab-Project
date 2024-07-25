namespace Crab_API.Models
{
    public class CrabDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CustomersCollectionName { get; set; } = null!;
        public string UsersCollectionName { get; set; } = null!;
        public string DriversCollectionName { get; set; } = null!;
        public string CallCenterAgentsCollectionName { get; set; } = null!;
        public string AdminsCollectionName { get; set; } = null!;
        public string DriverBookingCollectionName { get; set; } = null!;
        public string LocationCollectionName { get; set; } = null!;
        public string LocationRevenueCollectionName { get; set; } = null!;
        public string PaymentInfoCollectionName {  get; set; } = null!;
        public string username { get; set; } = null!;
        public string password { get; set; } = null!;
    }
}
