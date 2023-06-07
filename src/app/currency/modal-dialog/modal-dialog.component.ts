import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item.interface';
import { RestService } from '../../services/rest.service';
// Chart
import {  ChartConfiguration, ChartType } from 'chart.js';

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
      this.restService.getCandle(this.modalItem.Instrument)
        .subscribe((res: any) => { 
          if(this.currentDate == 'M'){
            // To find every day data of last month
            this.candleData = res.candles.map((item: any) => item.mid.o).slice(-30);
            // To find every day time of last month
            this.modalTime = res.candles.map((item: any) => item.time.substring(5, 10)).slice(-30);
          }
          else{
            // To find first day data of every month in year
            this.candleData = res.candles.filter((item: any) => item.time.substr(8, 2) === '01')
            .map((item: any) => item.mid.o).slice(-12);
            // To find first day time of every month in year
            this.modalTime = res.candles.filter((item: any) => item.time.substr(8, 2) === '01')
            .map((item: any) => item.time.substring(0, 7)).slice(-12) 
          }
        });
    }
    this.previousDate = this.currentDate; // Store the current date as the previous date for the next comparison
  }
  // Chart option and data
  public lineChartType: ChartType = 'line';
  public get lineChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.candleData|| [],
          label: this.modalItem.name,
          backgroundColor: "#EEE",
          borderColor: "#4169e1",
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

}