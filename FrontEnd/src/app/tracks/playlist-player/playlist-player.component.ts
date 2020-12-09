import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
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
  constructor(private http: HttpClient, private auth: AuthenticationService, private service: PlaylistPlayerService, private trackService: TracksService, private router: Router, private route: ActivatedRoute) { }

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
    dataTrack.tracksAlbum = {Id: track.album.id, Name: track.album.title, Cover: track.album.cover, coverSmall: track.album.cover_small, coverMedium: track.album.cover_medium, coverBig: track.album.cover_big, coverXL: track.album.coverXL, albumArtist: null, trackList: null};
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
        let trackInList = this.listTracks.find(a => a.Id == id);
        let postTrack = {id: trackInList.Id, title: trackInList.Title, album: trackInList.tracksAlbum.Name, albumId: trackInList.tracksAlbum.Id, duration: 30, artist: trackInList.tracksArtist.Name};
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

}
