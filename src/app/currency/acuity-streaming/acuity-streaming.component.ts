import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { WebSocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-acuity-streaming',
  templateUrl: './acuity-streaming.component.html',
  styleUrls: ['./acuity-streaming.component.scss']
})
export class AcuityStreamingComponent implements OnInit {
  constructor(private restService: RestService, private webSocketService: WebSocketService){}

  ngOnInit(): void {  
    this.webSocketService.socket$.subscribe(
      (msg: any) => {
        console.log(msg);      
      }
    )
  }
  sendMsg(message: string){
    this.webSocketService.sendMessage(message) 
  }
}
