import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) { }

  public getPlaylist = async (id) => {
    try 
    {
      let url = ApiService.backendHost + `/api/deezer/playlist/${id}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r;
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public searchPlaylist = async (query) => {
    try 
    {
      let url = ApiService.backendHost + `/api/deezer/search/playlist/${query}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r;
    }
    catch (e)
    {
      console.log(e);
    }
  }

  public get100PercentPlaylist = async (query) => {
    try 
    {
      let url = ApiService.backendHost + `/api/deezer/search/playlist/100/${query}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r;
    }
    catch (e)
    {
      console.log(e);
    }
  }

}
