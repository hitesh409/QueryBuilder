using System;
using System.Collections.Generic;

namespace BackendAPI.Models;

public partial class Report
{
    public Guid Id { get; set; }

    public Guid QueryId { get; set; }

    public string Format { get; set; } = null!;

    public DateTime GeneratedAt { get; set; }

    public byte[]? Data { get; set; }

    public string? Location { get; set; }

    public string ReportName { get; set; } = null!;

    public virtual Query Query { get; set; } = null!;
}
