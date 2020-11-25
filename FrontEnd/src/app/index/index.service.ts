import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private urlChart = 'https://api.deezer.com/chart';
  private urlSearch = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track/autocomplete?limit=10&q=';
  private finalData;
  constructor( private http: HttpClient ) { 
    

  }

  public getChartList = async () => {
    try {
        return await this.http.get(this.urlChart).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public getSearchList = async (artist) => {
    try 
    {
      let url = ApiService.backendHost + `/api/Deezer/${artist}`;
      let r = await this.http.get<any>(url).toPromise() as any;
      return r.data;
    }
    catch (e)
    {
      console.log(e);
    }
  }
    
}
