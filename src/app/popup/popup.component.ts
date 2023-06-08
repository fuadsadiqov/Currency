import { Component, Input, Inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../models/item.interface'
import { RestService } from '../services/rest.service';
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
  
  public candlesData!: Array<any>
  public candlesTime!: Array<any>
  public chartTime: string | boolean = false
  public itemName!: Item
  public itemCandle!: CandleItem
  private wholeData!: Array<any>

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {      
      this.wholeData = changes['item'].currentValue
      this.itemName = this.wholeData[0]
      this.itemCandle = this.wholeData[1]
      
      this.candlesData = this.itemCandle.candles.map((item: any) => item.mid.o).slice(-30);
      this.candlesTime = this.itemCandle.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);
    }
  }
  changeChartTime(value: string){
    this.chartTime = value
    if(this.chartTime == 'Y'){
      this.candlesData = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
      .map((item: any) => item.mid.o).slice(-12);
      // To find first day time of every month in year
      this.candlesTime = this.itemCandle.candles.filter((item: any) => item.time.substr(8, 2) === '01')
      .map((item: any) => item.time.substring(0, 7)).slice(-12)
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
