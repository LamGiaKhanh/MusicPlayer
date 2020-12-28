import { Component, OnInit } from '@angular/core';
import { Album } from '../model/model-album';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { DeezerService } from '../shared/service/deezer.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  listAlbum: Array<Album> = [];
  albumDataset: any[];
  isLoaded: boolean = false;

  constructor(private http: HttpClient, private auth: AuthenticationService, private service: DeezerService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }
  
  private reload = async () => {

    this.listAlbum = new Array<Album>();
    this.listAlbum = []
    this.albumDataset = await this.getAlbumList();
    this.isLoaded = true;

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

  
  public getAlbumList = async () => {
    try
    {
      const list = await this.service.getAlbumList('taylor') as any;
      console.log(list)
      if (list) 
      {
        for (let i = 0; i < 3; i++) 
        {  
          this.listAlbum.push(this.initAlbum(list[i]));
          
        }
      }
      const list2 = await this.service.getAlbumList('post malone') as any;
      if (list2) 
      {
        for (let i = 0; i < 3; i++) 
        {  
          this.listAlbum.push(this.initAlbum(list2[i]));
          
        }
      }
      const list3 = await this.service.getAlbumList('the weeknd') as any;
      if (list3) 
      {
        for (let i = 0; i < 3; i++) 
        {  
          this.listAlbum.push(this.initAlbum(list3[i]));
          
        }
      }
      const list4 = await this.service.getAlbumList('eminem') as any;
      if (list4) 
      {
        for (let i = 0; i < 3; i++) 
        {  
          this.listAlbum.push(this.initAlbum(list4[i]));
          
        }
      }
      const list5 = await this.service.getChartList() as any;
      if (list5)
      {
        for (let i = 0; i < list5.albums.data.length; i++) 
        {  
          this.listAlbum.push(this.initAlbum(list5.albums.data[i]));
          
        }
      }
      return this.listAlbum;
    }
    catch(e)
    {
      console.log(e);
    }
  }
  public onClick = async (query) => {
    this.router.navigate(['/album-player/'], {queryParams: {id: query}});
  }

  async likeAlbum(event: any, id: number)
  {
    if (this.auth.currentAccountValue == null) this.router.navigate(['/login'], {queryParams: {callback: this.router.url} });
    else 
    {
      if (event.currentTarget.classList.contains('liked'))
      {
        let url = ApiService.backendHost + `/api/FavoriteAlbums/${this.auth.currentAccountValue.id}/${id}`;
        try 
        {
          console.log(url)
          await this.http.delete(url).toPromise();
          this.auth.updateAlbum(id, false);
        }
        catch (e) { console.log(e) }
      }
      else 
      {
        let url = ApiService.backendHost + `/api/FavoriteAlbums`;
        let albumInList = this.listAlbum.find(a => a.Id == id);
        let postAlbum = {id: albumInList.Id, cover: albumInList.coverBig, artist: albumInList.albumArtist.Name, title: albumInList.Name}
        try 
        {
          let postObject = {accountId: this.auth.currentAccountValue.id, album: postAlbum}
          await this.http.post(url, postObject).toPromise();
          this.auth.updateAlbum(Number(id), true);
        }
        catch (e) { console.log(e); }
      }
    }
  }
}
