using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
        public ICollection<FavoriteAlbum> FavoriteAlbums { get; set; }
        public ICollection<FavoriteTrack> FavoriteTracks { get; set; }
        public ICollection<FavoritePlaylist> FavoritePlaylists { get; set; }
    }
}
