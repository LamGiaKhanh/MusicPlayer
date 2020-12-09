using MusicPlayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.ViewModels
{
    public class FavoriteAlbumVM
    {
        public int AccountId { get; set; }
        public Album Album { get; set; }
    }
}
