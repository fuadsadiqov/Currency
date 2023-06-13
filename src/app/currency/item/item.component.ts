import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Item } from '../models/item.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {  
  public wrapper: Item[] = []
  public filteredWrapper!: Item[] 
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
  openPopUp(item: Item) {
    this.hoveredItem = item;
    
    const cachedCandleData = localStorage.getItem(item.Instrument);
  
    if (cachedCandleData) {
      this.itemDetail = [item, JSON.parse(cachedCandleData)];
      this.popUp = true;
    } else {
      this.restService.getCandle(item.Instrument).subscribe(res => {
        this.itemDetail = [item, res];
        this.popUp = true;
        localStorage.setItem(item.Instrument, JSON.stringify(res));
      });
    }
  }
  closePopUp(){
    this.popUp = false  
  }  
  getGold() {
    // setInterval(() => {
        this.restService.getGold()
        .subscribe((res: any) => {
            this.wrapper = [...this.wrapper, res]          
        })
      // }, 5000)
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
        let yesterday = (day - 1) < 10 ? ('0' + (day - 1)) : (day - 1)
        let todayDate = year + '-' + month + '-' + day        
        let yesterdayDate = year + '-' + month + '-' + yesterday         

        let main = res['Meta Data']        
        let data = res['Time Series FX (Daily)']
        let currentPrice = data[todayDate]
        let yesterdayPrice = data[yesterdayDate]
        const dataArray = Object.entries(data).map(([date, values]: any) => ({ date, ...values }));
        
        this.wrapper = [...this.wrapper, {
          Instrument: main['2. From Symbol'],
          name: main['2. From Symbol'],
          s: currentPrice['1. open'],
          h: currentPrice['2. high'],
          l: currentPrice['3. low'],
          c: ((currentPrice['4. close'] - yesterdayPrice['4. close']) / currentPrice['4. close']) * 100,
          data: dataArray,
        }]            
    })
  }
  filteredItem(value: string){
    this.filteredWrapper = 
    this.wrapper.filter((item: Item) => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))  
  }
}