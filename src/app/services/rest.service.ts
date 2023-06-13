import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}
  //Api header, url and body 
  private apiKey: string = '4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f'
  private baseUrl: string = `https://dashboard.acuitytrading.com/OandaPriceApi/GetPrice?widgetName=oandainstrumentpage&apikey=${this.apiKey}`;
  private headers = new HttpHeaders({
    'authority': 'dashboard.acuitytrading.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en,ru;q=0.9',
    'access-control-allow-origin': '*',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'pragma': 'no-cache',
  });
  
  getGold(): Observable<any> {
      let goldBody = 'lang=en-GB&region=OGM&instrumentName=XAU_USD&granularity=D';
      const goldRequest$ = this.http.post(this.baseUrl, goldBody, { headers: this.headers });
      return goldRequest$;
    }
    getSilver(): Observable<any> {
      let silverBody = 'lang=en-GB&region=OGM&instrumentName=XAG_USD&granularity=D';
      const silverRequest$ = this.http.post(this.baseUrl, silverBody, { headers: this.headers });
      return silverRequest$;
    }
    getBTC(): Observable<any> {
      let btcBody = 'lang=en-GB&region=OGM&instrumentName=BTC_USD&granularity=D';
      const btcRequest$ = this.http.post(this.baseUrl, btcBody, { headers: this.headers });
      return btcRequest$;
    }
    getBrand(){
      let brandUrl = 'https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=' 
      let apikey = '5H1N9JO0O35L97E5'
      return this.http.get(brandUrl + apikey)
    }
    getUSD(){
      let usdUrl = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=AZN&apikey=YOUR_API_KEY'
      return this.http.get(usdUrl)
    }
    // Get every element detail data
    getCandle(instrument: string){
        if(instrument == 'Crude Oil Prices Brent'){
          this.getBrand()
        }
        const url = 'https://dashboard.acuitytrading.com/OandaPriceApi/GetCandles?widgetName=oandainstrumentpage&apikey=4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f'
        let goldBody = `lang=en-GB&region=OGM&instrumentName=${instrument}&granularity=D`;
        return this.http.post(url, goldBody, {headers: this.headers})
    }
}
