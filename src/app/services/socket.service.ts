import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  public messages: Subject<any> = new Subject<any>();

  constructor() { }
  
  public connect(url: string): void {
    this.socket = new WebSocket(url);
    
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.next(message);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  }

  public send(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  public close(): void {
    this.socket.close();
  }
}
