import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'src/app/model/model-track';
import { TrackPlayerService } from './track-player.service';
import { IndexService } from '../../index/index.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-track-player',
  templateUrl: './track-player.component.html',
  styleUrls: ['./track-player.component.scss']
})
export class TrackPlayerComponent implements OnInit {
  track: Track;
  tracks: Array<Track>;
  trackId;
  trackDataset: any;
  slideDataset : any;
  constructor(private service: TrackPlayerService, private globalService: IndexService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.trackId = params["Id"] || null;
    }); 
    this.reload();
  }

  async reload()
  {
    this.track = new Track();
    this.tracks = new Array<Track>();
    this.tracks = [];
    this.slideDataset =[];
    this.trackDataset= [];
    this.trackDataset = await this.loadTrack(this.trackId);
    this.slideDataset = await this.getSlide10(this.track.tracksArtist.Name);

  }
  initTrack(track: any): Track
  {
    let dataTrack = new Track();
    dataTrack.Id = track.id;
    dataTrack.Title = track.title_short;
    dataTrack.Link = track.link;
    dataTrack.Preview = track.preview;
    dataTrack.md5image = track.md5image;
    
    dataTrack.tracksAlbum = {Id: track.album.id, Name: track.album.name, Cover: track.album.cover, coverSmall: track.album.cover_small, coverMedium: track.album.cover_medium, coverBig: track.album.cover_big, coverXL: track.album.coverXL, albumArtist: null, trackList: null};
    dataTrack.tracksArtist = {Id: track.artist.id, Name: track.artist.name, pictureBig:track.artist.picture_big, pictureMedium:track.artist.picture_medium, pictureSmall:track.artist.picture_small,pictureXL: track.artist.picture_xl, Picture: track.artist.picture};
    // dataTrack.tracksAlbum.Id = track.album.id;
    // dataTrack.tracksAlbum.Name = track.album.name;
    // dataTrack.tracksAlbum.Cover = track.album.cover;
    // dataTrack.tracksAlbum.coverSmall = track.album.cover_small;
    // dataTrack.tracksAlbum.coverMedium = track.album.cover_medium;
    // dataTrack.tracksAlbum.coverBig = track.album.cover_big;
    return dataTrack;
  }

  public onTrackClick = async (query) => {
    this.router.navigate(['/track-player/'], {queryParams: {id: query}});
  }
  public loadTrack = async (id) => {
    try
    {
      const raw_track = await this.service.getTrack(id) as any;
      console.log(id);
      if (raw_track) 
      {
        this.track = this.initTrack(raw_track);
      }
      return this.track;
    }
    catch (e)
      {
        console.log(e);
      }
  }

  public getSlide10 = async (query) => {
    const list = await this.globalService.getSearchList(query) as any;
    console.log(list[1]);
    if (list) 
    {
      for (let i = 0; i < 10; i++) 
      {  
        this.tracks.push(this.initTrack(list[i]));
        
      }
    }
    return this.tracks;
  }
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
