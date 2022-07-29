using Microsoft.EntityFrameworkCore;

namespace PlantDB_Backend.Models
{
    public partial class PlantDBContext : DbContext
    {
        public PlantDBContext()
        {
        }

        public PlantDBContext(DbContextOptions<PlantDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cactus> Cacti { get; set; } = null!;
        public virtual DbSet<Fern> Ferns { get; set; } = null!;
        public virtual DbSet<PlantBase> PlantBases { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cactus>(entity =>
            {
                entity.ToTable("Cactus");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.PlantBaseId).HasColumnName("Plant Base ID");

                entity.HasOne(d => d.PlantBase)
                    .WithMany(p => p.Cacti)
                    .HasForeignKey(d => d.PlantBaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Fern>(entity =>
            {
                entity.ToTable("Fern");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.PlantBaseId).HasColumnName("Plant Base ID");

                entity.HasOne(d => d.PlantBase)
                    .WithMany(p => p.Ferns)
                    .HasForeignKey(d => d.PlantBaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<PlantBase>(entity =>
            {
                entity.ToTable("Plant Base");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AverageHeightInches)
                    .HasColumnType("DECIMAL")
                    .HasColumnName("Average Height Inches");

                entity.Property(e => e.Description).HasColumnType("VARCHAR(200)");

                entity.Property(e => e.LightingCondition)
                    .HasColumnType("TINYINT")
                    .HasColumnName("Lighting Condition");

                entity.Property(e => e.Name).HasColumnType("VARCHAR(100)");

                entity.Property(e => e.Nickname).HasColumnType("VARCHAR(100)");

                entity.Property(e => e.Origin).HasColumnType("VARCHAR(100)");

                entity.Property(e => e.WateringInterval)
                    .HasColumnType("TINYINT")
                    .HasColumnName("Watering Interval");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
