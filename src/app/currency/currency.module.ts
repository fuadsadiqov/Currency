import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { AppComponent } from '../app.component';
import { ItemComponent } from './item/item.component';
import { PopupComponent } from './popup/popup.component';
// NgChart
import { NgChartsModule } from 'ng2-charts';
// Angular Material Modules
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Input Mask Module
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    ItemComponent,
    AppComponent,
    PopupComponent,
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
    TextMaskModule
  ],
  providers: []
})
export class CurrencyModule { }
