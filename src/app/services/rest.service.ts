import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://football98.p.rapidapi.com/';

  headers: any = new HttpHeaders()
  .set('X-RapidAPI-Key', '74372c2d06mshbc2adc05e2043cbp106c81jsnb9cb11216a38')
  .set('X-RapidAPI-Host', 'football98.p.rapidapi.com');

  getCompetetions(query: string): Observable<Object>{
    if(query == "competetions"){
      return this.http.get(this.baseUrl + query, {headers: this.headers})
    }
    else{
      return this.http.get(this.baseUrl + "premierleague/" + query, {headers: this.headers})
    }
  }
}
