using MongoDB.Bson.Serialization.Attributes;

namespace Crab_API.Models
{
    public class CallCenterAgent : User
    {
        public string? HistoryId { get; set; }
    }
}
