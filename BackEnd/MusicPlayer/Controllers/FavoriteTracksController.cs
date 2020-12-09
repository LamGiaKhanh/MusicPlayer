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
    public class FavoriteTracksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoriteTracksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/FavoriteTracks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteTrack>>> GetFavoriteTracks()
        {
            return await _context.FavoriteTracks.ToListAsync();
        }

        // GET: api/FavoriteTracks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteTrack>> GetFavoriteTrack(long id)
        {
            var favoriteTrack = await _context.FavoriteTracks.FindAsync(id);

            if (favoriteTrack == null)
            {
                return NotFound();
            }

            return favoriteTrack;
        }


        // POST: api/FavoriteTracks
        [HttpPost]
        public async Task<ActionResult<FavoriteTrack>> PostFavoriteTrack(FavoriteTrackVM favoriteTrack)
        {
            var trackInDB = await _context.Tracks.Where(a => a.Id == favoriteTrack.Track.Id).FirstOrDefaultAsync();
            if (trackInDB == null) _context.Tracks.Add(favoriteTrack.Track);

            var favoriteTrackInDB = new FavoriteTrack() { AccountId = favoriteTrack.AccountId, TrackId = favoriteTrack.Track.Id, CreatedDate = DateTime.Now };
            _context.FavoriteTracks.Add(favoriteTrackInDB);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FavoriteTrackExists(favoriteTrack.AccountId))
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

        // DELETE: api/FavoriteTracks/5
        [HttpDelete("{account}/{track}")]
        public async Task<ActionResult<FavoriteAlbum>> DeleteFavoriteTrack(int account, long track)
        {
            var favoriteTrack = await _context.FavoriteTracks.Where(f => f.AccountId == account && f.TrackId == track).FirstOrDefaultAsync();
            if (favoriteTrack == null) return NotFound();
            _context.FavoriteTracks.Remove(favoriteTrack);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool FavoriteTrackExists(int id)
        {
            return _context.FavoriteTracks.Any(e => e.AccountId == id);
        }
    }
}
