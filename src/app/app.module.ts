import { NgModule } from '@angular/core';
import { CurrencyModule } from './currency/currency.module';
import { AppComponent } from './app.component';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [  
  ],
  imports: [
    CurrencyModule,
    InputMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
