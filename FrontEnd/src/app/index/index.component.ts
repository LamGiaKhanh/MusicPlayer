import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlyrComponent } from 'ngx-plyr';
import { fromEventPattern } from 'rxjs';
import { IndexService } from './index.service';
import { Track } from '../track-player/model/model-track';
import { Artist } from '../track-player/model/model-artist';
import { Album } from '../track-player/model/model-album';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tracks: Array<Track> = []
  public Id: string ='';
  public Title: string ='';
  public Link: string ='';
  public Preview: string ='';
  public md5image: string ='';
  public tracksArtist : Artist;
  public trackAlbum: Album;

  public dataset : any[];
  constructor(private service: IndexService ) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  private reload = async () => {
    this.tracks = new Array<Track>();
    this.tracks = [];
    this.dataset = await this.getSlide1();
    console.log(this.tracks[0].Id);
    console.log('11111');
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
    dataTrack.tracksAlbum = track.album;
    return dataTrack;
  }

  public getSlide1 = async () => {
    const list = await this.service.getSearchList('eminem') as any;
    console.log(list);
    if (list) 
    {
      for (let i = 0; i < 9; i++) 
      {  
        this.tracks.push(this.initTrack(list[i]));
      }
    }

    return this.tracks;
  }


  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  
  // or get it from plyrInit event
  player: Plyr;
  
  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];
  
  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  
  play(): void {
    this.player.play(); // or this.plyr.player.play()
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