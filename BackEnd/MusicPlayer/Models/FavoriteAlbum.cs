using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class FavoriteAlbum
    {
        public Account Account { get; set; }
        public int AccountId { get; set; }
        public Album Album { get; set; }
        public int AlbumId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
