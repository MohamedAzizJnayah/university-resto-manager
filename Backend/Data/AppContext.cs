using Microsoft.EntityFrameworkCore;
using ApiRestaurant.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ApiRestaurant.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Etudiant> Etudiants { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Paiement> Paiements { get; set; }
        public DbSet<Plat> Plats { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Admin
            modelBuilder.Entity<Admin>()
                .HasKey(a => a.Email);

            // Categorie
            modelBuilder.Entity<Categorie>()
                .HasKey(c => c.Id);

            // Etudiant
            modelBuilder.Entity<Etudiant>()
                .HasKey(e => e.Cin);

            modelBuilder.Entity<Etudiant>()
                .HasMany(e => e.Reservations)
                .WithOne(r => r.Etudiant)
                .HasForeignKey(r => r.EtudiantId);

            // Menu
            modelBuilder.Entity<Menu>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<Menu>()
                .HasOne(m => m.Categorie)
                .WithMany()
                .HasForeignKey(m => m.CategorieId);

            modelBuilder.Entity<Menu>()
                .HasMany(m => m.Plats)
                .WithOne(p => p.Menu)
                .HasForeignKey(p => p.MenuId);

            // Paiement
            modelBuilder.Entity<Paiement>()
                .HasKey(p => p.Id);

            // Plat
            modelBuilder.Entity<Plat>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Plat>()
                .HasMany(p => p.Reservations)
                .WithOne(r => r.Plat)
                .HasForeignKey(r => r.PlatId);

            // Reservation
            modelBuilder.Entity<Reservation>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Paiement)
                .WithMany()
                .HasForeignKey(r => r.PaiementId);
        }
    }
}
