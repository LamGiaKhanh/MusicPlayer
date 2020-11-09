using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class FavoriteTrack
    {
        public Account Account { get; set; }
        public int AccountId { get; set; }
        public Track Track { get; set; }
        public int TrackId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
