﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MusicPlayer.Models;

namespace MusicPlayer.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20201209023716_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("MusicPlayer.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("MusicPlayer.Models.Album", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<string>("Artist")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cover")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoriteAlbum", b =>
                {
                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<long>("AlbumId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("AccountId", "AlbumId");

                    b.HasIndex("AlbumId");

                    b.ToTable("FavoriteAlbums");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoritePlaylist", b =>
                {
                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<long>("PlaylistId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AccountId", "PlaylistId");

                    b.ToTable("FavoritePlaylists");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoriteTrack", b =>
                {
                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<long>("TrackId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("AccountId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("FavoriteTracks");
                });

            modelBuilder.Entity("MusicPlayer.Models.Playlist", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("MusicPlayer.Models.Track", b =>
                {
                    b.Property<long>("Id")
                        .HasColumnType("bigint");

                    b.Property<string>("Album")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AlbumId")
                        .HasColumnType("int");

                    b.Property<string>("Artist")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoriteAlbum", b =>
                {
                    b.HasOne("MusicPlayer.Models.Account", "Account")
                        .WithMany("FavoriteAlbums")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("MusicPlayer.Models.Album", "Album")
                        .WithMany("FavoriteAlbums")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Album");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoritePlaylist", b =>
                {
                    b.HasOne("MusicPlayer.Models.Account", "Account")
                        .WithMany("FavoritePlaylists")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("MusicPlayer.Models.FavoriteTrack", b =>
                {
                    b.HasOne("MusicPlayer.Models.Account", "Account")
                        .WithMany("FavoriteTracks")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("MusicPlayer.Models.Track", "Track")
                        .WithMany("FavoriteTracks")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("MusicPlayer.Models.Playlist", b =>
                {
                    b.HasOne("MusicPlayer.Models.Account", "Account")
                        .WithMany("Playlists")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("MusicPlayer.Models.Account", b =>
                {
                    b.Navigation("FavoriteAlbums");

                    b.Navigation("FavoritePlaylists");

                    b.Navigation("FavoriteTracks");

                    b.Navigation("Playlists");
                });

            modelBuilder.Entity("MusicPlayer.Models.Album", b =>
                {
                    b.Navigation("FavoriteAlbums");
                });

            modelBuilder.Entity("MusicPlayer.Models.Track", b =>
                {
                    b.Navigation("FavoriteTracks");
                });
#pragma warning restore 612, 618
        }
    }
}
