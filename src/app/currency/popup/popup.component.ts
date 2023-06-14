import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../models/item.interface'
// Chart
import {  ChartConfiguration, ChartType } from 'chart.js';
import { CandleItem } from '../models/candleItem.interface';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnChanges{
  @Input('item') item!: Array<any>
  constructor(){}
  // allData is candle of item and it divide to candlesChartData, candlesChartTime and selected item detail
  public allData!: Array<any>
  public candlesChartData!: Array<any>
  public candlesChartTime!: Array<any>
  public itemCandle!: CandleItem
  // itemName is name of selected item
  public itemName!: Item
  // It control chart's time 
  public isChart: string | boolean = false

  @Input('hoveredItem') hoveredItem!: Item
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {            
      this.allData = changes['item'].currentValue
      this.itemName = this.allData[0]
      this.itemCandle = this.allData[1]
      
      if(this.allData[1] == null){
        if(this.allData[0].name == "USD"){          
          this.candlesChartData = this.allData[0].data.map((item: any) => item['1. open']).slice(0, 30);
          this.candlesChartTime = this.allData[0].data.map((item: any) => item.date).slice(0, 30);
        }
      }
      else{
        this.candlesChartData = this.itemCandle.candles.map((item: any) => item.mid.o).slice(-30);
        this.candlesChartTime = this.itemCandle.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);      
      }
    }
    
  }
  changeChartTime(value: string){
    this.isChart = value
    if(this.isChart == 'Y'){      
      if(this.allData[1] == null){
        this.candlesChartData = this.allData[0].data.map((item: any) => item.value).slice(0, 12).reverse();
        this.candlesChartTime = this.allData[0].data.map((item: any) => item.date.substring(0, 7)).slice(0, 12).reverse();
      } 
      else{
        if(this.allData[0].name == "USD"){          
          this.candlesChartData = this.allData[0].data.map((item: any) => item['1. open']).slice(0, 30).reverse();
          this.candlesChartTime = this.allData[0].data.map((item: any) => item.date).slice(0, 30).reverse();
        } 
        else{
          this.candlesChartData = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
          .map((item: any) => item.mid.o).slice(-12);
          this.candlesChartTime = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
          .map((item: any) => item.time.substring(0, 7)).slice(-12)
          }
        }
      }
    else{
      this.candlesChartData = this.itemCandle.candles.map((item: any) => item.mid.o).slice(-30);
      this.candlesChartTime = this.itemCandle.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);
    }
  }
  base!: number;
  result!: number | undefined;
  
  calculatePower() {
    this.result = this.base * this.hoveredItem.s;
  }
  
  public lineChartType: ChartType = 'line';
  public get lineChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.candlesChartData|| [],
          label: this.itemName.name,
          backgroundColor: "#EEE",
          borderColor: "#4169e1",
          fill: 'origin',
        }
      ],
      labels: this.candlesChartTime || [],
    };
  }
  public lineChartOptions: ChartConfiguration['options'] = {   
    plugins: {
      legend: { display: true }
    }
  };
}