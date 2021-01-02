using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<FavoriteAlbum> FavoriteAlbums { get; set; }
        public DbSet<FavoritePlaylist> FavoritePlaylists { get; set; }
        public DbSet<FavoriteTrack> FavoriteTracks { get; set; }
        public DbSet<Track> Tracks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityColumn();
            });

            modelBuilder.Entity<FavoriteAlbum>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.AlbumId });
                entity.HasOne(a => a.Account).WithMany(u => u.FavoriteAlbums).HasForeignKey(a => a.AccountId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(a => a.Album).WithMany(u => u.FavoriteAlbums).HasForeignKey(a => a.AlbumId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<FavoritePlaylist>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.PlaylistId });
                entity.HasOne(a => a.Account).WithMany(u => u.FavoritePlaylists).HasForeignKey(a => a.AccountId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<FavoriteTrack>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.TrackId });
                entity.HasOne(a => a.Account).WithMany(u => u.FavoriteTracks).HasForeignKey(a => a.AccountId).OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(a => a.Track).WithMany(u => u.FavoriteTracks).HasForeignKey(a => a.TrackId).OnDelete(DeleteBehavior.Restrict);
            });
            //modelBuilder.Entity<Playlist>(entity =>
            //{
            //    entity.Property(e => e.Id).UseIdentityColumn();
            //    entity.HasOne(a => a.Account).WithMany(u => u.Playlists).HasForeignKey(a => a.AccountId).OnDelete(DeleteBehavior.Restrict);
            //});
        }
    }
}
