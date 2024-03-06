using System;
using System.Collections.Generic;

namespace BackendAPI.Models;

public partial class Query
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid DatasetId { get; set; }

    public string QueryText { get; set; } = null!;

    public DateTime SavedAt { get; set; }

    public string QueryName { get; set; } = null!;

    public virtual Dataset Dataset { get; set; } = null!;

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public virtual User User { get; set; } = null!;
}
