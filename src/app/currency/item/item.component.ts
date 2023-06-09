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
  getUsd(){
    this.restService.getBrand()
    .subscribe((res: any) => {
      console.log(res);
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
}