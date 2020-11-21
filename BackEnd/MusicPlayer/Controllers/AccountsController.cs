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
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Accounts -> login
        [HttpPost]
        public async Task<ActionResult<object>> Login(Account account)
        {
            var accountInDB = await _context.Accounts.Where(a => a.Email.ToLower() == account.Email.ToLower() && a.Password == account.Password)
                                                     .Include(a=>a.FavoriteAlbums)
                                                     .Include(a=>a.FavoriteTracks)
                                                     .Include(a => a.FavoritePlaylists)
                                                     .Include(a => a.Playlists).FirstOrDefaultAsync();
            if (accountInDB == null) return NoContent();
            var activities = new
            {
                AlbumsIds = accountInDB.FavoriteAlbums.Select(a => a.AlbumId),
                TrackIds = accountInDB.FavoriteTracks.Select(t => t.TrackId),
                LikedPlaylistIds = accountInDB.FavoritePlaylists.Select(p => p.PlaylistId),
                OwnedPlaylistIds = accountInDB.Playlists.Select(p => p.Id)
            };
            return new { Account = new Account() { Id = accountInDB.Id, Email = accountInDB.Email }, Activities = activities };
        }

        // POST: api/Accounts/Register - Register account -> register
        [HttpPost("Register")]
        public async Task<ActionResult<Account>> Register(Account account)
        {
            var accountWithExistedEmail = await _context.Accounts.Where(a => a.Email.ToLower() == account.Email.ToLower()).FirstOrDefaultAsync();
            if (accountWithExistedEmail != null) return NoContent();
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return account;
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}
