using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Crab_API.Models
{
    public class PaymentInfo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? PaymentId { get; set; }
        public string? DriverId { get; set; }
        public string? CustomerId { get; set; }
        public string? DriverBookingId { get; set; }
        public float? PaymentAmount { get; set; }
        public MethodType? PaymentMethod { get; set; }
        public Status? PaymentStatus { get; set; }
        public DateTime PaymentDate { get; set; }

        public enum Status
        {
            Processing,
            Successful,
            Failed
        }
        public enum MethodType
        {
            Momo,
            Cash
        }

    }
}
