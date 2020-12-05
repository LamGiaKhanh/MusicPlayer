import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }
  public getAlbumList = async (query) => {
    try 
    {
      let url = ApiService.backendHost + `/api/Deezer/search/album/${query}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r.data;
    }
    catch (e)
    {
      console.log(e);
    }
  }
}
