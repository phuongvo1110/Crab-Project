using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Crab_API.Models
{
    public class DriverBooking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string CustomerId { get; set; }
        public string? CustomerPhoneNumber { get; set; }

        public string? StaffID { get; set; }

        public string? DriverID { get; set; }

        public string? DepartureID { get; set; }

        public string? DestinationID { get; set; }

        public string? TimeDuration { get; set; }

        public string? pageUrl { get; set; }

        public DateTime? Date { get; set; }

        public int? Vehicle { get; set; }

        public Method? PaymentType { get; set; }

        public string? BookingType { get; set; }
        public float Price { get; set; }
        public float Distance { get; set; }
        public BookingStatus? StatusType { get; set; }
        
        public enum VehicleType
        {
            Motorbike,
            Car
        }
        public enum BookingStatus
        {
            Success,
            Fail,
            Processing
        }
        public enum Method
        {
            Momo,
            Cash
        }
    }
}