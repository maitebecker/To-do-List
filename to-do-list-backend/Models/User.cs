using Microsoft.AspNetCore.Identity;

public class User
{
   public int Id { get; set; }
   public string UserName { get; set; } = string.Empty;
   public string Email { get; set; } = string.Empty;
   public string PasswordHash { get; set; } = string.Empty;
   public string? RefreshToken { get; set; } 
   public DateTime? RefreshTokenExpiryTime { get; set; } 
   public ICollection<Task> Tasks { get; set; } = new List<Task>();
}