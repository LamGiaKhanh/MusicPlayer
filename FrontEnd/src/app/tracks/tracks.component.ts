import { i18nMetaToDocStmt } from '@angular/compiler/src/render3/view/i18n/meta';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VimePlayer } from '@vime/angular';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Playlist } from '../model/model-playlist';
import { TracksService } from './tracks.service';
import { IndexService } from '../index/index.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  indexPlaylist: Array<Playlist>  = [];
  indexPlaylistDataset: any;

  best2020Playlist: Array<Playlist>  = [];
  best2020PlaylistDataset: any;

  onRepeatPlaylist: Array<Playlist>  = [];
  onRepeatPlaylistDataset: any;

  constructor(private service: TracksService,private globalService: IndexService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reload();

  }
  async reload()
  {
    this.indexPlaylist = new Array<Playlist>();
    this.indexPlaylist = [];
    this.best2020Playlist = new Array<Playlist>();
    this.best2020Playlist = [];
     this.onRepeatPlaylist = new Array<Playlist>();
    this.onRepeatPlaylist = [];


    this.indexPlaylistDataset = await this.getTopChart();
    this.best2020PlaylistDataset = await this.getBest2020();
    this.onRepeatPlaylistDataset = await this.getOnRepeat();




  }
  initPlaylist(playlist: any): Playlist
  {
    let dataPlaylist = new Playlist();
    dataPlaylist.Id = playlist.id;
    dataPlaylist.Title = playlist.title;
    dataPlaylist.numberTrack = playlist.nb_tracks;
    dataPlaylist.Picture = playlist.picture;
    dataPlaylist.pictureSmall = playlist.picture_small;
    dataPlaylist.pictureMedium = playlist.picture_medium;
    dataPlaylist.pictureBig = playlist.picture_big;
    dataPlaylist.pictureXL = playlist.picture_xl;
    dataPlaylist.Creator = {Id: playlist.user.id, Name: playlist.user.name, trackList: null, Picture:null, pictureSmall:null, pictureMedium:null, pictureBig:null, pictureXL:null ,Country: null};
    return dataPlaylist;
  }

  public getTopChart = async () => {
    try {
      const list = await this.globalService.getChartList() as any;
      if (list)
      {
        for (let i = 0; i < 10; i++) 
        {
          this.indexPlaylist.push(this.initPlaylist(list.playlists.data[i]));
        }
        
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public getBest2020 = async () => {
    try {
      const list = await this.service.searchPlaylist("best 2020") as any;
      if (list)
      {
        for (let i = 0; i < 10; i++) 
        {
          this.best2020Playlist.push(this.initPlaylist(list.data[i]));
        }
        
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public getOnRepeat = async () => {
    try {
      const list = await this.service.searchPlaylist("on repeat") as any;
      if (list)
      {
        for (let i = 0; i < 10; i++) 
        {
          this.onRepeatPlaylist.push(this.initPlaylist(list.data[i]));
        }
        
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public onPlaylistClick = async (query) => {
    this.router.navigate(['/playlist-player/'], {queryParams: {id: query}});
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
}
