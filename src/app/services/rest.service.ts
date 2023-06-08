import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}
  //Api header, url and body 
  baseUrl: string = 'https://dashboard.acuitytrading.com/OandaPriceApi/GetPrice?widgetName=oandainstrumentpage&apikey=4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f';
  headers = new HttpHeaders({
    'authority': 'dashboard.acuitytrading.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en,ru;q=0.9',
    'access-control-allow-origin': '*',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'pragma': 'no-cache',
    });
    body: string = ''
    // Get all element's data in 1 function
    getData(data: string): Observable<any> {
      let goldBody = `lang=en-GB&region=OGM&instrumentName=XAU_USD${data ? `&granularity=${data}` : ''}`;
      let silverBody = `lang=en-GB&region=OGM&instrumentName=XAG_USD${data ? `&granularity=${data}` : ''}`;
      let bitcoinBody = `lang=en-GB&region=OGM&instrumentName=BTC_USD${data ? `&granularity=${data}` : ''}`;
      
      const goldRequest$ = this.http.post(this.baseUrl, goldBody, { headers: this.headers });
      const silverRequest$ = this.http.post(this.baseUrl, silverBody, { headers: this.headers });
      const bitcoinRequest$ = this.http.post(this.baseUrl, bitcoinBody, { headers: this.headers });
      
      return forkJoin([goldRequest$, silverRequest$, bitcoinRequest$]);
    }
    // Get every element detail data
    getCandle(instrument: string){
        const url = 'https://dashboard.acuitytrading.com/OandaPriceApi/GetCandles?widgetName=oandainstrumentpage&apikey=4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f'
        let goldBody = `lang=en-GB&region=OGM&instrumentName=${instrument}&granularity=D`;
        return this.http.post(url, goldBody, {headers: this.headers})
    }
}
