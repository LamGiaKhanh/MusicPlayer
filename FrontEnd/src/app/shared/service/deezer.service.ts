import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private http: HttpClient) { }
  public async getAlbumPlayer(id): Promise<any>
  {
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
      return null
    }
  }

  public getTrackPlayer = async (id) => {
    try 
    {
      let url = ApiService.backendHost + `/api/deezer/track/player/${id}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r;
    }
    catch (e)
    {
      console.log(e);
    }
  }

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

  public getChartList = async () => {
    try {
      let url = ApiService.backendHost + `/api/Deezer/chart`;
        return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public getSearchList = async (query) => {
    try 
    {
      let url = ApiService.backendHost + `/api/Deezer/search/track/${query}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r.data;
    }
    catch (e)
    {
      console.log(e);
    }
  }

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
