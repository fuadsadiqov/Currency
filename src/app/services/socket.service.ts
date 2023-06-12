import { Injectable } from '@angular/core';
import { EMPTY, Subject, catchError, switchAll, tap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | undefined;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(
    tap({

    })
    ,catchError((e: any) => { throw e }));
  
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
   WS_ENDPOINT='wss://api.acuitytrading.com/api/streaming?apiKey=4b12e6bb-7ecd-49f7-9bbc-2e03644ce41f';
  private getNewWebSocket() {
    return webSocket({
      url:this.WS_ENDPOINT,
      serializer: msg => JSON.stringify({roles: "admin,user", msg})
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