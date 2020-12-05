import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private finalData;
  constructor( private http: HttpClient ) { 
    

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
    
}
