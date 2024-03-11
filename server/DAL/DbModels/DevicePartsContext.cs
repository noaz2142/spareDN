using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.DbModels;

public partial class DevicePartsContext : DbContext
{
    public DevicePartsContext()
    {
    }

    public DevicePartsContext(DbContextOptions<DevicePartsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<PartForDevice> PartForDevices { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-EV7M95R\\SQLUSER;Initial Catalog=deviceParts;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=Yes;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategorId).HasName("PK__Categori__080263A7B11BCA2B");

            entity.HasIndex(e => e.Description, "UQ__Categori__4EBBBAC949AC0D54").IsUnique();

            entity.Property(e => e.Description)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PartForDevice>(entity =>
        {
            entity.HasKey(e => e.PartForDeviceId).HasName("PK__PartForD__40A9C9715B49F313");

            entity.ToTable("PartForDevice");

            entity.Property(e => e.Brand)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.CategoryId).HasDefaultValueSql("((4))");
            entity.Property(e => e.Description)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.Device)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.IsAvailable)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValueSql("((1))")
                .IsFixedLength()
                .HasColumnName("isAvailable");
            entity.Property(e => e.Model)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.PartImage)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.PartLocationCity)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("partLocationCity");
            entity.Property(e => e.PartLocationState)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValueSql("('Israel')")
                .HasColumnName("partLocationState");
            entity.Property(e => e.PartName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.PartForDevices)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PartForDe__Categ__4E88ABD4");

            entity.HasOne(d => d.Contact).WithMany(p => p.PartForDevices)
                .HasForeignKey(d => d.ContactId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PartForDe__Conta__49C3F6B7");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C54FDFF73");

            entity.HasIndex(e => e.UserName, "UQ__Users__C9F2845649689C9A").IsUnique();

            entity.Property(e => e.City)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Mail)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(11)
                .IsUnicode(false);
            entity.Property(e => e.State)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasDefaultValueSql("('Israel')");
            entity.Property(e => e.UserName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UserPassword)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
