using MongoDB.Bson.Serialization.Attributes;

namespace Crab_API.Models
{
    public class Driver : User
    {
        public string? VehicleType { get; set; }
        public string? VehicleRegistration { get; set; }
        public StatusType? Status { get; set; }
        public float? Longtitude {get; set;}
        public float? Latitude {get; set;}
        public string? HistoryId { get; set; }
        public enum StatusType {
            Busy,
            Availbable
        }
    }
}
