import { Component, OnInit } from '@angular/core';
import { Album } from '../model/model-album';
import { AlbumsService } from './albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  listAlbum: Array<Album> = [];
  albumDataset: any[];
  constructor(private service: AlbumsService) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }
  
  private reload = async () => {

    this.listAlbum = new Array<Album>();
    this.listAlbum = []
    this.albumDataset = await this.getAlbumList();


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
    dataAlbum.albumArtist.Id = album.artist.id;
    dataAlbum.albumArtist.Name = album.artist.name;
    dataAlbum.albumArtist.Picture = album.artist.picture;
    dataAlbum.albumArtist.pictureSmall = album.artist.picture_small;
    dataAlbum.albumArtist.pictureMedium = album.artist.picture_medium;
    dataAlbum.albumArtist.pictureBig = album.artist.picture_big;
    dataAlbum.albumArtist.pictureXL = album.artist.picture_xl;
    //trackList api: https://api.deezer.com/album/{{id}}/tracks
    return dataAlbum;
  }

  
  public getAlbumList = async () => {
    try{
    const list = await this.service.getAlbumList('travisscott') as any;
    if (list) 
    {
      for (let i = 0; i < 2; i++) 
      {  
        this.listAlbum.push(this.initAlbum(list[i]));
        
      }
    }
    const list2 = await this.service.getAlbumList('post malone') as any;
    if (list2) 
    {
      for (let i = 0; i < 2; i++) 
      {  
        this.listAlbum.push(this.initAlbum(list[i]));
        
      }
    }
    const list3 = await this.service.getAlbumList('drake') as any;
    if (list3) 
    {
      for (let i = 0; i < 2; i++) 
      {  
        this.listAlbum.push(this.initAlbum(list[i]));
        
      }
    }
    const list4 = await this.service.getAlbumList('eminem') as any;
    if (list4) 
    {
      for (let i = 0; i < 2; i++) 
      {  
        this.listAlbum.push(this.initAlbum(list[i]));
        
      }
    }
    return this.listAlbum;
    }
    catch(e)
    {
      console.log(e);
    }
  }
}
