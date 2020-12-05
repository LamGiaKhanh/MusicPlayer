import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/model/model-playlist';
import { Track } from 'src/app/model/model-track';
import { TracksService } from '../tracks.service';
import { PlaylistPlayerService } from './playlist-player.service';

@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.component.html',
  styleUrls: ['./playlist-player.component.scss']
})
export class PlaylistPlayerComponent implements OnInit {
  playlistId;
  listTracks: Array<Track>;
  playlistDetail: Playlist;
  constructor(private service: PlaylistPlayerService, private trackService: TracksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.playlistId = params["Id"] || null;
    }); 
    this.reload();


  }

  reload()
  {
    this.listTracks = new Array<Track>();
    this.listTracks = [];
    this.playlistDetail = new Playlist();

    this.loadTracks(this.playlistId);
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
    // dataTrack.tracksAlbum.Id = track.album.id;
    // dataTrack.tracksAlbum.Name = track.album.name;
    // dataTrack.tracksAlbum.Cover = track.album.cover;
    // dataTrack.tracksAlbum.coverSmall = track.album.cover_small;
    // dataTrack.tracksAlbum.coverMedium = track.album.cover_medium;
    // dataTrack.tracksAlbum.coverBig = track.album.cover_big;
    return dataTrack;
  }

  public loadTracks = async (id) => {
    const playlist = await this.trackService.getPlaylist(id) as any;
    if (playlist) 
    {
      this.playlistDetail = this.initPlaylist(playlist);
      const listTracks = await this.service.getTracks(id) as any;
      for (let i = 0; i < listTracks.data.length; i++) 
      {  
        this.listTracks.push(this.initTrack(listTracks.data[i]));
      }
    }
    return this.listTracks;
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
    dataPlaylist.Creator = {Id: playlist.creator.id, Name: playlist.creator.name, trackList: null, Picture:null, pictureSmall:null, pictureMedium:null, pictureBig:null, pictureXL:null ,Country: null};
    return dataPlaylist;
  }


}
