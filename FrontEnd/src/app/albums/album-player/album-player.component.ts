import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeezerService } from '../../shared/service/deezer.service';
import { Track } from 'src/app/model/model-track';
import { Album } from 'src/app/model/model-album';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ApiService } from 'src/app/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album-player',
  templateUrl: './album-player.component.html',
  styleUrls: ['./album-player.component.scss']
})
export class AlbumPlayerComponent implements OnInit {
  albumId;
  listTracks: Array<Track>;
  albumDetail: Album;
  constructor(private http: HttpClient, private auth: AuthenticationService, private service:DeezerService , private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.albumId = params["Id"] || null;
    }); 
    this.reload();
  }

  reload()
  {
    this.listTracks = new Array<Track>();
    this.listTracks = [];
    this.albumDetail = new Album();

    this.loadTracks(this.albumId);
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
  initTrack(track: any): Track
  {
    let dataTrack = new Track();
    dataTrack.Id = track.id;
    dataTrack.Title = track.title_short;
    dataTrack.Link = track.link;
    dataTrack.Preview = track.preview;
    dataTrack.md5image = track.md5image;
    dataTrack.tracksArtist = {Id: track.artist.id, Name: track.artist.name, pictureBig:track.artist.picture_big, pictureMedium:track.artist.picture_medium, pictureSmall:track.artist.picture_small,pictureXL: track.artist.picture_xl, Picture: track.artist.picture};
    return dataTrack;
  }

  public loadTracks = async (id) => {
    const list = await this.service.getAlbumPlayer(id) as any;
    if (list) 
    {
      this.albumDetail = this.initAlbum(list);
      for (let i = 0; i < list.tracks.data.length; i++) 
      {  
        this.listTracks.push(this.initTrack(list.tracks.data[i]));
      }
    }
    return this.listTracks;
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
        let postTrack = {id: trackInList.Id, title: trackInList.Title, album: this.albumDetail.Name, albumId: this.albumDetail.Id, duration: 30, artist: this.albumDetail.albumArtist.Name};
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
