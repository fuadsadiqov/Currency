import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const WEBSOCKET_SERVICE_TOKEN = 'WEBSOCKET_SERVICE_TOKEN';

@Injectable({
  providedIn: 'root',
  useFactory: () => new WebSocketService(), // Use a factory function to create a new instance
  deps: []
})
export class WebSocketService {
  private socket!: WebSocket;

  constructor() { }

  connect(url: string): Observable<any> {
    this.socket = new WebSocket(url);

    return new Observable<any>(observer => {
      this.socket.onmessage = (event: MessageEvent) => {
        observer.next(JSON.parse(event.data));
      };

      this.socket.onerror = (error) => {
        observer.error(error);
      };

      this.socket.onclose = () => {
        observer.complete();
      };
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
export default WebSocketService; // Add this line if it's missing