import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Item } from '../../models/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {  
  public wrapper: Item[] = []
  public itemDetail: any
  public popUp: boolean = false
  public hoveredItem!: Item
  
  constructor(private restService: RestService, private dialog: MatDialog){}
  
  ngOnInit(): void {
    this.getGold();
    this.getSilver();
    this.getBtc();
    this.getBrand()
    this.getUsd()
  }
  // openDialog(item: Item) {
  //     this.dialog.open(ModalDialogComponent, {
  //       data: {
  //         item: item,
  //       },
  //     });
  // }
  openPopUp(item: Item){  
    this.hoveredItem = item
    this.popUp = true
    this.restService.getCandle(item.Instrument)
    .subscribe(res => {
      this.itemDetail = [item, res]      
    })
  }  
  closePopUp(){
    this.popUp = false  
  }  
  getGold() {
    this.restService.getGold()
    .subscribe((res: any) => {      
      this.wrapper = [...this.wrapper, res]          
    })
  }
  getSilver() {
    this.restService.getSilver()
    .subscribe((res: any) => {
      this.wrapper = [...this.wrapper, res]          
    })
  }
  getBtc() {
    this.restService.getBTC()
    .subscribe((res: any) => {
      this.wrapper = [...this.wrapper, res]          
    })
  }
  getBrand(){
    this.restService.getBrand()
    .subscribe((res: any) => {
        this.wrapper = [...this.wrapper, {
          Instrument: res.name,
          name: res.name,
          c: ((res.data[0].value - res.data[1].value) / res.data[1].value) * 100,
          s: res.data[0].value,
          h: undefined,
          l: undefined,
          data: res.data
        }]
      })
    }
    getUsd(){
      this.restService.getUSD()
      .subscribe((res: any) => {          
        // Find current day USD price
        let day: any = new Date().getUTCDate()
        let month: any = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        day = day < 10 ? ('0' + day) : day
        month = month < 10 ? ('0' + month) : month
        let fullyear = year + '-' + month + '-' + day        

        let main = res['Meta Data']        
        let data = res['Time Series FX (Daily)']
        let currentPrice = data[fullyear] 
        const dataArray = Object.entries(data).map(([date, values]: any) => ({ date, ...values }));

        this.wrapper = [...this.wrapper, {
          Instrument: main['2. From Symbol'],
          name: main['2. From Symbol'],
          c: currentPrice['4. close'],
          h: currentPrice['2. high'],
          l: currentPrice['3. low'],
          s: currentPrice['1. open'],
          data: dataArray
      }]      
    })
  }
}