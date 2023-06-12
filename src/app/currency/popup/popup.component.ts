import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../models/item.interface'
// Chart
import {  ChartConfiguration, ChartType } from 'chart.js';
import { CandleItem } from '../models/candleItem.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnChanges{
  @Input('item') item!: Array<any>
  constructor(){}
  // WholeData is candle of item and it divide to candlesData, candlesTime and selected item detail
  public wholeData!: Array<any>
  public candlesData!: Array<any>
  public candlesTime!: Array<any>
  public itemCandle!: CandleItem
  // itemName is name of selected item
  public itemName!: Item
  // It control chart's time 
  public chartTime: string | boolean = false

  @Input('hoveredItem') hoveredItem!: Item
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {            
      this.wholeData = changes['item'].currentValue
      this.itemName = this.wholeData[0]
      this.itemCandle = this.wholeData[1]
      
      if(this.wholeData[1] == null){
        if(this.wholeData[0].name == "USD"){          
          this.candlesData = this.wholeData[0].data.map((item: any) => item['1. open']).slice(0, 30);
          this.candlesTime = this.wholeData[0].data.map((item: any) => item.date).slice(0, 30);
        }
      }
      else{
        this.candlesData = this.itemCandle.candles.map((item: any) => item.mid.o).slice(-30);
        this.candlesTime = this.itemCandle.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);      
      }
    }
    
  }
  changeChartTime(value: string){
    this.chartTime = value
    if(this.chartTime == 'Y'){      
      if(this.wholeData[1] == null){
        this.candlesData = this.wholeData[0].data.map((item: any) => item.value).slice(0, 12).reverse();
        this.candlesTime = this.wholeData[0].data.map((item: any) => item.date.substring(0, 7)).slice(0, 12).reverse();
      } 
      else{
        if(this.wholeData[0].name == "USD"){          
          this.candlesData = this.wholeData[0].data.map((item: any) => item['1. open']).slice(0, 30).reverse();
          this.candlesTime = this.wholeData[0].data.map((item: any) => item.date).slice(0, 30).reverse();
        } 
        else{
          this.candlesData = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
          .map((item: any) => item.mid.o).slice(-12);
          this.candlesTime = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
          .map((item: any) => item.time.substring(0, 7)).slice(-12)
          }
        }
      }
    else{
      this.candlesData = this.itemCandle.candles.map((item: any) => item.mid.o).slice(-30);
      this.candlesTime = this.itemCandle.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);
    }
  }

  public lineChartType: ChartType = 'line';
  public get lineChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.candlesData|| [],
          label: this.itemName.name,
          backgroundColor: "#EEE",
          borderColor: "#4169e1",
          fill: 'origin',
        }
      ],
      labels: this.candlesTime || [],
    };
  }
  public lineChartOptions: ChartConfiguration['options'] = {   
    plugins: {
      legend: { display: true }
    }
  };
}