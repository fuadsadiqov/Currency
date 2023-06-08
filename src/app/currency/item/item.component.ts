import { Component, HostListener, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Item } from '../../models/item.interface';
import {MatDialog} from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {  
  public wrapper: any
  private granularity!: string 
  public itemDetail: any
  public popUp: boolean = false
  constructor(private restService: RestService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.getData(this.granularity);
  }

  openDialog(item: Item) {
      this.dialog.open(ModalDialogComponent, {
        data: {
          item: item,
        },
      });
  }
  openPopUp(item: Item){
    this.popUp = true
    this.restService.getCandle(item.Instrument)
    .subscribe(res => {
      this.itemDetail = [item, res]      
    })
  }  
  closePopUp(){
    this.popUp = false
  }  
  getData(granularity: string) {
        // setInterval(() => {
          this.restService.getData(granularity)
          .subscribe((res: any) => {
            this.wrapper = res          
          })
        // }, 1000)
  }
}