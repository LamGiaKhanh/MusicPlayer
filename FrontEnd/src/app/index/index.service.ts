import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private urlChart = 'https://api.deezer.com/chart';
  constructor( private http: HttpClient ) { 
    

  }
}
