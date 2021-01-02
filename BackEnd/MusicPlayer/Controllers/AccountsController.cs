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
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // POST: api/Accounts -> login
        [HttpPost]
        public async Task<ActionResult<object>> Login(Account account)
        {
            var accountInDB = await _context.Accounts.Where(a => a.Email.ToLower() == account.Email.ToLower() && a.Password == account.Password)
                                                     .Include(a => a.FavoriteAlbums)
                                                     .Include(a => a.FavoriteTracks)
                                                     .Include(a => a.FavoritePlaylists)
                                                     .FirstOrDefaultAsync();
            if (accountInDB == null) return NoContent();
            var activities = new
            {
                AlbumsIds = accountInDB.FavoriteAlbums.Select(a => a.AlbumId),
                TrackIds = accountInDB.FavoriteTracks.Select(t => t.TrackId),
                LikedPlaylistIds = accountInDB.FavoritePlaylists.Select(p => p.PlaylistId),
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


        // POST: api/Accounts/ChangePassword - Đổi password -> change-password
        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword(PasswordsVM passwords)
        {
            var accountInDB = await _context.Accounts.Where(a => a.Id == passwords.AccountId && a.Password == passwords.Password).FirstOrDefaultAsync();
            if (accountInDB == null) return new JsonResult("fail");
            accountInDB.Password = passwords.NewPass;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
