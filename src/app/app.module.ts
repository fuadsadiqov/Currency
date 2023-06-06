import { NgModule } from '@angular/core';
import { CurrencyModule } from './currency/currency.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
