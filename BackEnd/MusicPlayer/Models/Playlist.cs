using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class Playlist
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool IsPrivate { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Account Account { get; set; }
        public int AccountId { get; set; }
    }
}
