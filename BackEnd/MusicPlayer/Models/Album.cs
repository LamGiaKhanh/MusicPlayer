using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicPlayer.Models
{
    public class Album
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Cover { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public ICollection<FavoriteAlbum> FavoriteAlbums { get; set; }
    }
}
