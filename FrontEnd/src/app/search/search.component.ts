import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public auth: AuthenticationService, private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) 
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
  }
  query: string = "";
  url: string = ApiService.backendHost + '/api/deezer/search/'
  searchResult: any = {tracks: [], albums: [], playlists: []};
  notFound: boolean = false;

  customOptions: OwlOptions = {
    center: true,
    items:4,
    loop:true,
    margin:30,
    nav:false,
    dots:true,
    autoplay: true,
    slideTransition: 'linear',
    autoplayTimeout: 6000,
    autoplaySpeed: 6000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }

  ngOnInit(): void 
  {
    this.route.queryParams.subscribe(params => {
      this.query = params["query"] || null;
    }); 

    if (this.query != null) this.search();
  }
  async search()
  {
    try
    {
      let result = await this.http.get(this.url + this.query).toPromise();
      this.searchResult = result;
      this.notFound = false;
    }
    catch(e)
    {
      console.log(e);
      this.notFound = true;
    }
  }

  async likeAlbum(event: any, id: number)
  {
    if (this.auth.currentAccountValue == null) this.router.navigate(['/login'], {queryParams: {callback: this.router.url} });
    else 
    {
      if (event.currentTarget.classList.contains('liked'))
      {
        let url = ApiService.backendHost + `/api/FavoriteAlbums/${this.auth.currentAccountValue.id}/${id}`;
        try 
        {
          console.log(url)
          await this.http.delete(url).toPromise();
          this.auth.updateAlbum(id, false);
        }
        catch (e) { console.log(e) }
      }
      else 
      {
        let url = ApiService.backendHost + `/api/FavoriteAlbums`;
        let albumInList = this.searchResult.albums.find(a => a.id == id);
        let postAlbum = {id: albumInList.id, cover: albumInList.cover_big, artist: albumInList.artist.name, title: albumInList.title}
        try 
        {
          let postObject = {accountId: this.auth.currentAccountValue.id, album: postAlbum}
          await this.http.post(url, postObject).toPromise();
          this.auth.updateAlbum(Number(id), true);
        }
        catch (e) { console.log(e); }
      }
    }
  }

  async likeTrack(event: any, id: number)
  {
    if (this.auth.currentAccountValue == null) this.router.navigate(['/login'], {queryParams: {callback: this.router.url} });
    else 
    {
      if (event.currentTarget.classList.contains('liked'))
      {
        let url = ApiService.backendHost + `/api/FavoriteTracks/${this.auth.currentAccountValue.id}/${id}`;
        try 
        {
          await this.http.delete(url).toPromise();
          this.auth.updateTrack(id, false);
        }
        catch (e) { console.log(e) }
      }
      else 
      {
        let url = ApiService.backendHost + `/api/FavoriteTracks`;
        let trackInList = this.searchResult.tracks.find(a => a.id == id);
        let postTrack = {id: trackInList.id, title: trackInList.title, album: trackInList.album.title, albumId: trackInList.album.id, duration: 30, artist: trackInList.artist.name};
        try 
        {
          let postObject = {accountId: this.auth.currentAccountValue.id, track: postTrack}
          await this.http.post(url, postObject).toPromise();
          this.auth.updateTrack(id, true);
        }
        catch (e) { console.log(e); }
      }
    }
  }
  
  async likePlaylist(event: any, id: number)
  {
    if (this.auth.currentAccountValue == null) this.router.navigate(['/login'], {queryParams: {callback: this.router.url} });
    else 
    {
      if (event.currentTarget.classList.contains('liked'))
      {
        let url = ApiService.backendHost + `/api/FavoritePlaylists/${this.auth.currentAccountValue.id}/${id}`;
        try 
        {
          await this.http.delete(url).toPromise();
          this.auth.updateLikedPlaylist(id, false);
        }
        catch (e) { console.log(e) }
      }
      else 
      {
        let playlist = this.searchResult.playlists.find(p => p.id == id);
        let postPlaylist = { accountId: this.auth.currentAccountValue.id, playlistId: playlist.id, name: playlist.title, image: playlist.picture_big, createdDate: new Date()};
        try 
        {
          let url = ApiService.backendHost + `/api/FavoritePlaylists`;
          await this.http.post(url, postPlaylist).toPromise();
          this.auth.updateLikedPlaylist(id, true);
        }
        catch (e) { console.log(e); }
      }
    }
  }
}
