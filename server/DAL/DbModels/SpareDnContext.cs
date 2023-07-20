using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.DbModels;

public partial class SpareDnContext : DbContext
{
    public SpareDnContext()
    {
    }

    public SpareDnContext(DbContextOptions<SpareDnContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PartForDevice> PartForDevices { get; set; }

    public virtual DbSet<PartForOther> PartForOthers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\User\\Documents\\SpareDNDB.mdf;Integrated Security=True;Connect Timeout=30");
       // => optionsBuilder.UseSqlServer("name=postgresqlconnectionstring");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PartForDevice>(entity =>
        {
            entity.HasKey(e => e.PartForDeviceId).HasName("PK__PartForD__40A9C971F4E0865B");

            entity.ToTable("PartForDevice");

            entity.Property(e => e.PartImage)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.PartName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PartForOther>(entity =>
        {
            entity.HasKey(e => e.PartForOtherId).HasName("PK__PartForO__E6B72856E8AE2E2D");

            entity.ToTable("PartForOther");

            entity.Property(e => e.DateForTaken).HasColumnType("datetime");
            entity.Property(e => e.PartStatus)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.PartForDevice).WithMany(p => p.PartForOthers)
                .HasForeignKey(d => d.PartForDeviceId)
                .HasConstraintName("FK__PartForOt__PartF__3C69FB99");

            entity.HasOne(d => d.User).WithMany(p => p.PartForOthers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__PartForOt__UserI__3D5E1FD2");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CB03DD94C");

            entity.HasIndex(e => e.UserName, "UQ__Users__C9F2845670E6DAE7").IsUnique();

            entity.Property(e => e.LoginName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mail)
                .HasMaxLength(50)
                .IsUnicode(false);
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
