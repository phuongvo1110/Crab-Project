using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Crab_API.Models
{
    public class Location
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public float Longtitude { get; set; }
        public float Latitude { get; set; }
        public string Destination { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string District { get; set; }
        public string Street { get; set; }
    }
}
