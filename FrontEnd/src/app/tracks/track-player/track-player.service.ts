import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrackPlayerService {

  constructor( private http: HttpClient ) { }

  public getTrack = async (id) => {
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
}
