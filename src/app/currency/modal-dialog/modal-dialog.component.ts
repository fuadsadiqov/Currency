import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item.interface';
import { RestService } from '../../services/rest.service';
import { CandleItem } from '../../models/candleItem.interface';
// Chart
import {  ChartConfiguration, ChartType } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit{
  
  // MAT_DIALOG_DATA is used for import data from item
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private restService: RestService) {}
  
  // Current date of modal example: daily, monthly
  public currentDate: string = 'M'
  // Modal's current name
  public modalItem: Item = this.data.item
  // Modal data from 2012
  public candleData: any = undefined
  // Toggle text to chart
  public toggleChart: boolean = false
  // Dates below chart
  modalTime!: string[]
  // Chart backgroundcolor
  chartBgColor!: string
  // This variable is used for avoid meaningless response
  previousDate!: string;
  
  // It change chart background color with their name
  changeChartColor(){
    if(this.modalItem.name == 'Gold'){
      this.chartBgColor = 'gold'
    }
    if(this.modalItem.name == 'Silver'){
      this.chartBgColor = 'silver'
    }
    if(this.modalItem.name == "Bitcoin"){
      this.chartBgColor = "#F2A900"
    }
  }

  ngOnInit(){    
    this.getCandleData()
    this.changeChartColor()
  }

  changeChartDate(value: string){
    this.currentDate = value
    this.getCandleData()
    this.toggleChart = true
  }
  getCandleData(){    
    if (this.currentDate !== this.previousDate) {
      this.restService.getCandle(this.modalItem.Instrument, this.currentDate)
        .subscribe((res: any) => {
          this.candleData = res.candles.map((item: any) => item.mid.o);
          this.modalTime = res.candles.map((item: any) => item.time.substring(0, 10));
        });
    }
    this.previousDate = this.currentDate; // Store the current date as the previous date for the next comparison
  }
  public get lineChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.candleData|| [],
          label: this.modalItem.name,
          backgroundColor: this.chartBgColor,
          fill: 'origin',
        }
      ],
      labels: this.modalTime || [],
    };
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    
   
    plugins: {
      legend: { display: true }
    }
  };
  public lineChartType: ChartType = 'bar';

}
