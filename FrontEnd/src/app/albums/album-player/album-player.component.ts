import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumPlayerService } from './album-player.service';
import { AlbumsService  } from '../albums.service';
import { Track } from 'src/app/model/model-track';
import { Album } from 'src/app/model/model-album';

@Component({
  selector: 'app-album-player',
  templateUrl: './album-player.component.html',
  styleUrls: ['./album-player.component.scss']
})
export class AlbumPlayerComponent implements OnInit {
  albumId;
  listTracks: Array<Track>;
  albumDetail: Album;
  constructor(private service: AlbumPlayerService, private GAService: AlbumsService, private router: Router, private route: ActivatedRoute) { }

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
    console.log(this.listTracks[1].Title);
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
    const list = await this.service.getAlbumList(id) as any;
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

  

}
