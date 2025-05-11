using System;
using System.Text.Json.Serialization;
using TO_DO_LIST.Models;

public class Task
{
    public int Id {get; set; }
    public string? Description {get; set;}
    public DateTime DateAndTime {get; set;}
    public string Time => DateAndTime.ToString("HH:mm");
    public string Date => DateAndTime.ToString("yyyy-MM-dd");
    public EnumTaskStatus Status {get; set;}

    // Foreign key
    public int UserId { get; set; }
    
    [JsonIgnore]
    // Propriedade de navegação
    public User? User { get; set; }

}