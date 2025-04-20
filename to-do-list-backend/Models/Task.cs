using System;
using System.Text.Json.Serialization;
using TO_DO_LIST.Models;

public class Task
{
    public int Id {get; set; }
    public string? Description {get; set;}
    public DateTime DateAndTime {get; set;}
    public string Time => DateAndTime.ToString("HH:mm");
    public string Date => DateAndTime.ToString("dd/MM/yyyy");
    public EnumTaskStatus Status {get; set;}

}