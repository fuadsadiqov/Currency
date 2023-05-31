import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public competetions: any
  constructor(private restService: RestService){}
  ngOnInit(){

  }
  getInfo(value: any){      
    this.restService.getCompetetions(value)
    .subscribe(res => this.competetions = res)
  }
}
