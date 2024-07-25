using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Crab_API.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonElement("Name")]
    public string Name { get; set; }
    public string Email { get; set; }
    public Role RolePermission { get; set; }
    public string? PasswordHash { get; set; }
    public string Password {  get; set; }
    public string PhoneNumber { get; set; }
    public enum Role
    {
        CustomerRole,
        DriverRole,
        CallCenterAgentRole,
        AdminRole
    }
}