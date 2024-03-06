using System;
using System.Collections.Generic;

namespace BackendAPI.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? Email { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Dataset> Datasets { get; set; } = new List<Dataset>();

    public virtual ICollection<Query> Queries { get; set; } = new List<Query>();
}
