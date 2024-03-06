using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Models;

public partial class QueryBuilderContext : DbContext
{
    public QueryBuilderContext()
    {
    }

    public QueryBuilderContext(DbContextOptions<QueryBuilderContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Dataset> Datasets { get; set; }

    public virtual DbSet<Query> Queries { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server=DESKTOP-ZODIAC4;Database=QueryBuilder;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Dataset>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Datasets__3213E83FC4098ECD");

            entity.HasIndex(e => new { e.UserId, e.Name }, "UniqueUserDataset").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Location).HasColumnName("location");
            entity.Property(e => e.Metadata).HasColumnName("metadata");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.UploadedAt)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime")
                .HasColumnName("uploaded_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Datasets)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Datasets_Users");
        });

        modelBuilder.Entity<Query>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Queries__3213E83FB100C7D4");

            entity.HasIndex(e => e.QueryName, "UQ__Queries__2224BB9F7329E2FD").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.DatasetId).HasColumnName("dataset_id");
            entity.Property(e => e.QueryName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("query_name");
            entity.Property(e => e.QueryText).HasColumnName("query_text");
            entity.Property(e => e.SavedAt)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime")
                .HasColumnName("saved_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Dataset).WithMany(p => p.Queries)
                .HasForeignKey(d => d.DatasetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Queries_Datasets");

            entity.HasOne(d => d.User).WithMany(p => p.Queries)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Queries_Users");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reports__3213E83F2090D832");

            entity.HasIndex(e => e.ReportName, "UQ__Reports__E2078B50B6F7586B").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.Format)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("format");
            entity.Property(e => e.GeneratedAt)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime")
                .HasColumnName("generated_at");
            entity.Property(e => e.Location).HasColumnName("location");
            entity.Property(e => e.QueryId).HasColumnName("query_id");
            entity.Property(e => e.ReportName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("report_name");

            entity.HasOne(d => d.Query).WithMany(p => p.Reports)
                .HasForeignKey(d => d.QueryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reports_Queries");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83FFDA13798");

            entity.HasIndex(e => e.Email, "UQ__Users__AB6E616432462264").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__Users__F3DBC572349F7F92").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getutcdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
