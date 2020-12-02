import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlyrComponent } from 'ngx-plyr';
import { VimePlayer} from 'node_modules/@vime/angular';
import { fromEventPattern } from 'rxjs';
import { IndexService } from './index.service';
import { Track } from '../model/model-track';
import { Artist } from '../model/model-artist';
import { Album } from '../model/model-album';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tracks: Array<Track> = [];
  topTracks: Array<Track> = [];
  topAlbum: Array<Album> = [];
  topArtist: Array<Artist> = [];
  indexTrack: Track;
  public Id: string ='';
  public Title: string ='';
  public Link: string ='';
  public Preview: string ='';
  public md5image: string ='';
  public tracksArtist : Artist;
  public trackAlbum: Album;

  public dataset : any[];
  public topTrackDataset : any[];
  constructor(private service: IndexService ) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private reload = async () => {
    this.tracks = new Array<Track>();
    this.tracks = [];
    this.indexTrack = new Track();
    this.dataset = await this.getSlide1();
    this.topTracks = new Array<Track>();
    this.topAlbum = new Array<Album>();
    this.topArtist = new Array<Artist>();
    this.topTracks = [];
    this.topAlbum = [];
    this.topArtist = [];
    this.getIndexTrack();
    await this.getTopChart();

    console.log(this.topTracks[1].Title);

  }

  initTrack(track: any): Track
  {
    let dataTrack = new Track();
    dataTrack.Id = track.id;
    dataTrack.Title = track.title_short;
    dataTrack.Link = track.link;
    dataTrack.Preview = track.preview;
    dataTrack.md5image = track.md5image;
    dataTrack.tracksArtist = track.artist;
    dataTrack.tracksArtist.Id = track.artist.id;
    dataTrack.tracksArtist.Name = track.artist.name;
    dataTrack.tracksArtist.pictureSmall = track.artist.picture_small;
    dataTrack.tracksArtist.pictureMedium = track.artist.picture_medium;    
    dataTrack.tracksArtist.pictureXL = track.artist.picture_xl;
    dataTrack.tracksArtist.Picture = track.artist.picture;
    dataTrack.tracksAlbum = {Id: track.album.id, Name: track.album.name, Cover: track.album.cover, coverSmall: track.album.cover_small, coverMedium: track.album.cover_medium, coverBig: track.album.cover_big, coverXL: null, albumArtist: null, trackList: null};
    // dataTrack.tracksAlbum.Id = track.album.id;
    // dataTrack.tracksAlbum.Name = track.album.name;
    // dataTrack.tracksAlbum.Cover = track.album.cover;
    // dataTrack.tracksAlbum.coverSmall = track.album.cover_small;
    // dataTrack.tracksAlbum.coverMedium = track.album.cover_medium;
    // dataTrack.tracksAlbum.coverBig = track.album.cover_big;
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
    // dataAlbum.albumArtist.Id = album.artist.id;
    // dataAlbum.albumArtist.Name = album.artist.name;
    // dataAlbum.albumArtist.Picture = album.artist.picture;
    // dataAlbum.albumArtist.pictureSmall = album.artist.picture_small;
    // dataAlbum.albumArtist.pictureMedium = album.artist.picture_medium;
    // dataAlbum.albumArtist.pictureBig = album.artist.picture_big;
    // dataAlbum.albumArtist.pictureXL = album.artist.picture_xl;
    //trackList api: https://api.deezer.com/album/{{id}}/tracks
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
    
    //trackList api: 	"https://api.deezer.com/artist/75798/top?limit=10"
    return dataArtist;
  }


  public getSlide1 = async () => {
    const list = await this.service.getSearchList('travisscott') as any;
    if (list) 
    {
      for (let i = 0; i < 9; i++) 
      {  
        this.tracks.push(this.initTrack(list[i]));
        
      }
    }
    return this.tracks;
  }

  public getTopChart = async () => {
    try {
      const list = await this.service.getChartList() as any;
      if (list)
      {
        for (let i = 0; i < 9; i++) 
        {
          // console.log(list.tracks.data[i])
          this.topTracks.push(this.initTrack(list.tracks.data[i]));
          this.topAlbum.push(this.initAlbum(list.albums.data[i]));
          this.topArtist.push(this.initArtist(list.artists.data[i]));
        }
        
      }
      console.log(this.topTracks)
      console.log(this.topAlbum)
      console.log(this.topArtist)
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public getIndexTrack = async () => {
    const list = await this.service.getSearchList('bank account') as any;
    if (list) 
    {
      this.indexTrack = this.initTrack(list[0]);
    }

    return this.indexTrack;
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

}