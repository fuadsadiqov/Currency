import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from '../app.component';
import { ItemComponent } from './item/item.component';
import { ModalDialogComponent } from '../currency/modal-dialog/modal-dialog.component';
// NgChart
import { NgChartsModule } from 'ng2-charts';
// Angular Material
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PopupComponent } from './popup/popup.component';
import { AcuityStreamingComponent } from './acuity-streaming/acuity-streaming.component';

@NgModule({
  declarations: [
    ItemComponent,
    ModalDialogComponent,
    AppComponent,
    PopupComponent,
    AcuityStreamingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgChartsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: []
})
export class CurrencyModule { }
