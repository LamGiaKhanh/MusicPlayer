﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MusicPlayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeezerController : ControllerBase
    {
        [HttpGet("search/track/{query}")]
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
        [HttpGet("playlist/{query}")]
        public async Task<ActionResult<object>> GetPlaylist(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"playlist/{query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("playlist/player/{query}")]
        public async Task<ActionResult<object>> GetTrackinPlaylist(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"playlist/{query}/tracks"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("search/playlist/{query}")]
        public async Task<ActionResult<object>> SearchPlaylist(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/playlist/autocomplete?limit=20&q={query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("search/playlist/100/{query}")]
        public async Task<ActionResult<object>> Search100Playlist(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/playlist/autocomplete?limit=20&q=100%%20{query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }

        [HttpGet("search/album/{query}")]
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

        [HttpGet("track/player/{query}")]
        public async Task<ActionResult<object>> GetSpecifyTrack(string query)
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"/track/{query}"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    result = JsonConvert.DeserializeObject<object>(apiResponse);
                }
            }
            return result;
        }



        [HttpGet("chart")]
        public async Task<ActionResult<object>> GetCharts()
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

        [HttpGet("search/{query}")]
        public async Task<ActionResult<object>> Search(string query)
        {
            object albums;
            object tracks;
            object playlists;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/track?q={query}&limit=10"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<JObject>(apiResponse);
                    tracks = result["data"];
                }
            }

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/album?q={query}&limit=10"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<JObject>(apiResponse);
                    albums = result["data"];
                }
            }

            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + $"search/playlist?q={query}&limit=10"))
                {
                    if (!response.IsSuccessStatusCode) return NotFound();
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<JObject>(apiResponse);
                    playlists = result["data"];
                }
            }
            return new { Tracks = tracks, Albums = albums, Playlists = playlists};
        }

        [HttpGet("album/release")]
        public async Task<ActionResult<object>> GetNewReleasedAlbums()
        {
            object result;
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(ApiHelper.Deezer + "editorial/116/releases"))
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
