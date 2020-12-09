using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicPlayer.Models;

namespace MusicPlayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritePlaylistsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoritePlaylistsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FavoritePlaylists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoritePlaylist>>> GetFavoritePlaylists()
        {
            return await _context.FavoritePlaylists.ToListAsync();
        }

        // GET: api/FavoritePlaylists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoritePlaylist>> GetFavoritePlaylist(long id)
        {
            var favoritePlaylist = await _context.FavoritePlaylists.FindAsync(id);

            if (favoritePlaylist == null)
            {
                return NotFound();
            }

            return favoritePlaylist;
        }

        // POST: api/FavoritePlaylists
        [HttpPost]
        public async Task<ActionResult<FavoritePlaylist>> PostFavoritePlaylist(FavoritePlaylist favoritePlaylist)
        {
            _context.FavoritePlaylists.Add(favoritePlaylist);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FavoritePlaylistExists(favoritePlaylist.AccountId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFavoritePlaylist", new { id = favoritePlaylist.AccountId }, favoritePlaylist);
        }

        // DELETE: api/FavoritePlaylists/5
        [HttpDelete("{account}/{playlist}")]
        public async Task<ActionResult<FavoritePlaylist>> DeleteFavoritePlaylist(int account, long playlist)
        {
            var favoritePlaylist = await _context.FavoritePlaylists.Where(f => f.AccountId == account && f.PlaylistId == playlist).FirstOrDefaultAsync();
            if (favoritePlaylist == null) return NotFound();
            _context.FavoritePlaylists.Remove(favoritePlaylist);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool FavoritePlaylistExists(int id)
        {
            return _context.FavoritePlaylists.Any(e => e.AccountId == id);
        }
    }
}
