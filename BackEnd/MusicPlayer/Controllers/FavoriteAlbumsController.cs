using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicPlayer.Models;
using MusicPlayer.ViewModels;

namespace MusicPlayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteAlbumsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoriteAlbumsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FavoriteAlbums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteAlbum>>> GetFavoriteAlbums()
        {
            return await _context.FavoriteAlbums.ToListAsync();
        }

        // GET: api/FavoriteAlbums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteAlbum>> GetFavoriteAlbum(long id)
        {
            var favoriteAlbum = await _context.FavoriteAlbums.FindAsync(id);

            if (favoriteAlbum == null)
            {
                return NotFound();
            }

            return favoriteAlbum;
        }

        // POST: api/FavoriteAlbums
        [HttpPost]
        public async Task<ActionResult> PostFavoriteAlbum(FavoriteAlbumVM favoriteAlbum)
        {
            var albumInDB = await _context.Albums.Where(a => a.Id == favoriteAlbum.Album.Id).FirstOrDefaultAsync();
            if (albumInDB == null) _context.Albums.Add(favoriteAlbum.Album);
            var favoriteAlbumInDB = new FavoriteAlbum() { AccountId = favoriteAlbum.AccountId, AlbumId = favoriteAlbum.Album.Id, CreatedDate = DateTime.Now };
            _context.FavoriteAlbums.Add(favoriteAlbumInDB);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FavoriteAlbumExists(favoriteAlbum.AccountId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/FavoriteAlbums/5
        [HttpDelete("{account}/{album}")]
        public async Task<ActionResult<FavoriteAlbum>> DeleteFavoriteAlbum(int account, long album)
        {
            var favoriteAlbum = await _context.FavoriteAlbums.Where(f => f.AccountId == account && f.AlbumId == album).FirstOrDefaultAsync();
            if (favoriteAlbum == null) return NotFound();
            _context.FavoriteAlbums.Remove(favoriteAlbum);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool FavoriteAlbumExists(int id)
        {
            return _context.FavoriteAlbums.Any(e => e.AccountId == id);
        }
    }
}
