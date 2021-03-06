import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { VimePlayer} from 'node_modules/@vime/angular';
import { DeezerService } from '../shared/service/deezer.service';
import { Track } from '../model/model-track';
import { Artist } from '../model/model-artist';
import { Album } from '../model/model-album';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  topTracks: Array<Track> = [];
  topAlbum: Array<Album> = [];
  topArtist: Array<Artist> = [];
  indexTrack: Track;
  isLoaded: boolean = false;
  public dataset : any[];
  public topTrackDataset : any[];
  latestAlbums: any[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService, private service: DeezerService, private router: Router ) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private reload = async () => {
  
    this.indexTrack = new Track();
    this.latestAlbums = await this.service.getLatestAlbums();
    this.topTracks = new Array<Track>();
    this.topAlbum = new Array<Album>();
    this.topArtist = new Array<Artist>();
    this.topTracks = [];
    this.topAlbum = [];
    this.topArtist = [];
    await this.getIndexTrack();
    this.isLoaded = true;
    await this.getTopChart();
  }

  initTrack(track: any): Track
  {
    let dataTrack = new Track();
    dataTrack.Id = track.id;
    dataTrack.Title = track.title_short;
    dataTrack.Link = track.link;
    dataTrack.Preview = track.preview;
    dataTrack.md5image = track.md5image;
    dataTrack.tracksArtist = {Id: track.artist.id, Name: track.artist.name, pictureBig:track.artist.picture_big, pictureMedium:track.artist.picture_medium, pictureSmall:track.artist.picture_small,pictureXL: track.artist.picture_xl, Picture: track.artist.picture};
    dataTrack.tracksAlbum = {Id: track.album.id, Name: track.album.title, Cover: track.album.cover, coverSmall: track.album.cover_small, coverMedium: track.album.cover_medium, coverBig: track.album.cover_big, coverXL: track.album.coverXL, albumArtist: null, trackList: null};
    return dataTrack;
  }

  initAlbum(album: any): Album
  {
    let dataAlbum = new Album();
    dataAlbum.Id = album.id;
    dataAlbum.Name = album.title;
    dataAlbum.Cover = album.cover;
    dataAlbum.coverBig = album.cover_big;
    dataAlbum.coverMedium = album.cover_medium;
    dataAlbum.coverSmall = album.cover_small;
    dataAlbum.coverXL = album.cover_xl;
    dataAlbum.albumArtist = {Id:  album.artist.id, Name: album.artist.name, Picture: album.artist.picture, pictureSmall: album.artist.picture_small, pictureMedium: album.artist.picture_medium, pictureBig: album.artist.picture_big, pictureXL: album.artist.picture_xl }

    return dataAlbum;
  }

  initArtist(artist: any): Artist
  {
    let dataArtist = new Artist();
    dataArtist.Id = artist.id;
    dataArtist.Name = artist.name;
    dataArtist.Picture = artist.picture;
    dataArtist.pictureSmall = artist.picture_small;
    dataArtist.pictureMedium = artist.picture_medium;
    dataArtist.pictureBig = artist.picture_big;
    dataArtist.pictureXL = artist.picture_xl;
    
    return dataArtist;
  }


  // public getSlide10 = async () => {
  //   const list = await this.service.getSearchList('travis scott') as any;
  //   if (list) 
  //   {
  //     for (let i = 0; i < 10; i++) 
  //     {  
  //       this.tracks.push(this.initTrack(list[i]));
        
  //     }
  //   }
  //   return this.tracks;
  // }

  public getTopChart = async () => {
    try {
      const list = await this.service.getChartList() as any;
      if (list)
      {
        for (let i = 0; i < 10; i++) 
        {
          this.topTracks.push(this.initTrack(list.tracks.data[i]));
          this.topAlbum.push(this.initAlbum(list.albums.data[i]));
          this.topArtist.push(this.initArtist(list.artists.data[i]));
        }
        
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public getIndexTrack = async () => {
    try
    {
    const list = await this.service.getSearchList('willow') as any;
    if (list) 
    {
      this.indexTrack = this.initTrack(list[0]);
    }

    return this.indexTrack;
    }
    catch (e)
    {
      console.log(e);
    }

  }
  public onAlbumClick = async (query) => {
    this.router.navigate(['/album-player/'], {queryParams: {id: query}});
  }

  public onTrackClick = async (query) => {
    this.router.navigate(['/track-player/'], {queryParams: {id: query}});
  }

  @ViewChild('player') player!: VimePlayer;
  
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
  
  async likeTrack(event: any, track: Track)
  {
    if (this.auth.currentAccountValue == null) this.router.navigate(['/login'], {queryParams: {callback: this.router.url} });
    else 
    {
      if (event.currentTarget.classList.contains('liked'))
      {
        let url = ApiService.backendHost + `/api/FavoriteTracks/${this.auth.currentAccountValue.id}/${track.Id}`;
        try 
        {
          await this.http.delete(url).toPromise();
          this.auth.updateTrack(track.Id, false);
        }
        catch (e) { console.log(e) }
      }
      else 
      {
        let postTrack = {id: track.Id, title: track.Title, album: track.tracksAlbum.Name, albumId: track.tracksAlbum.Id, duration: 30, artist: track.tracksArtist.Name};
        try 
        {
          let url = ApiService.backendHost + `/api/FavoriteTracks`;
          let postObject = {accountId: this.auth.currentAccountValue.id, track: postTrack}
          await this.http.post(url, postObject).toPromise();
          this.auth.updateTrack(track.Id, true);
        }
        catch (e) { console.log(e); }
      }
    }
  }
  
}