import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {
  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    // Connect to WebSocket server
    this.websocketService.connect('wss://localhost:8080');

    // Subscribe to WebSocket messages
    this.websocketService.messages.subscribe((message) => {
      console.log('Received message:', message);
      // Handle the received message
    });
  }

  sendMessage(): void {
    const message = { text: 'Hello, WebSocket!' };
    this.websocketService.send(message);
  }

  ngOnDestroy(): void {
    // Close WebSocket connection when the component is destroyed
    this.websocketService.close();
  }
}
