using MusicPlayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.ViewModels
{
    public class FavoriteTrackVM
    {
        public int AccountId { get; set; }
        public Track Track { get; set; }
    }
}
