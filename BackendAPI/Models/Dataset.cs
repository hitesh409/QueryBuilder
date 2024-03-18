using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BackendAPI.Models;

public partial class Dataset
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string? Name { get; set; }

    public DateTime UploadedAt { get; set; }

    public string? Metadata { get; set; }

    public string? Location { get; set; }

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();

    [JsonIgnore]
    public virtual User User { get; set; } = null!;
}
