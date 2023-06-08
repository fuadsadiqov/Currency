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
  @Input('item') item!: CandleItem
  public candlesData!: Array<any>
  public candlesTime!: Array<any>

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.candlesData = changes['item'].currentValue.candles.map((item: any) => item.mid.o).slice(-30);
      this.candlesTime = changes['item'].currentValue.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);
    }
  }

  public lineChartType: ChartType = 'line';
  public get lineChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.candlesData|| [],
          label: this.item.instrument,
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
