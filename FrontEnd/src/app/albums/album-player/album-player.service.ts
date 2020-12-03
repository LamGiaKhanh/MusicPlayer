import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumPlayerService {

  constructor(private http: HttpClient) { }

  public getAlbumList = async (id) => {
    try 
    {
      let url = ApiService.backendHost + `/api/deezer/album/player/${id}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      console.log(r);
      return r;
    }
    catch (e)
    {
      console.log(e);
    }
  }
}
