using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Crab_API.Models
{
    public class LocationRevenue
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string City { get; set; }
        public float TotalRevenue { get; set; }

    }
}
