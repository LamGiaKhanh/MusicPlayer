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
        public async Task<ActionResult<object>> SearchAutoCompletes(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/track/autocomplete?limit=10&q={query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("album/{query}")]
        public async Task<ActionResult<object>> Get3TracksAlbum(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/album/&q=artist:" + '"'+ $"{query}" + '"' +$" &limit=3"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("album/player/{query}")]
        public async Task<ActionResult<object>> GetEntireAlbum(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"/album/{query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }


        [HttpGet("Chart")]
        public async Task<ActionResult<object>> GetCharts(string type)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + "chart"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }
    }
}
