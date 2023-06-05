import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Item } from '../models/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public bitcoin: any = undefined
  wrapper: any
  granularity!: string 
  constructor(private restService: RestService){}

  ngOnInit() {
    this.getData(this.granularity);
  }
  
  getData(granularity: string) {
      this.restService.getData(granularity)
      .subscribe((res: any) => {
        console.log(res[0]);
        this.wrapper = res
      })
  }
  getCurrently() {
    let granularity!: string
    this.getData(granularity);
  }
  getDaily() {
    const granularity = "D";
    this.getData(granularity);
  }
  getMonthly() {
    const granularity = "M";
    this.getData(granularity);
  }
}
