import { Injectable } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket$: WebSocketSubject<any>
  private apiKey: string = '4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f'
  private WS_ENDPOINT = 'wss://dashboard.acuitytrading.com/OandaPriceApi/GetPrice?widgetName=oandainstrumentpage&apikey=' + this.apiKey;
  // private WS_ENDPOINT = 'wss://api.acuitytrading.com/api/streaming?apiKey=' + this.apiKey;
  messagesSubject$: any;

  constructor(){
    this.socket$ = new WebSocketSubject(this.WS_ENDPOINT)
  }
  sendWebSocketMessage(message: any) {
    this.socket$.next(message);
  }
  // public messages$ = this.messagesSubject$.pipe(
  //   tap({
  //   })
  //   ,catchError((e: any) => { throw e }));
  
  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }
  private getNewWebSocket() {
    return webSocket({
      url:this.WS_ENDPOINT,
      serializer: msg => JSON.stringify({
        ["action"]: "subscribe",
        ["topic"]: "sentiments",
        ["period"]: 1,
        ["format"]: 0
      })
    })
  }
  sendMessage(msg: any) {
    if(this.socket$)
      this.socket$.next(msg);
  }
  close() {
    if(this.socket$)
      this.socket$.complete(); 
  }
}