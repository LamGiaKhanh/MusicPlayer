using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MusicPlayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeezerController : ControllerBase
    {
        [HttpGet("{query}")]
        public async Task<ActionResult<object>> GetAccounts(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/track/autocomplete?limit=10&q={query}"))
                {
                    // Lỗi ghế đã được chọn
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }
    }
}
