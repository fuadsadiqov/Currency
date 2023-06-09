import { NgModule } from '@angular/core';
import { CurrencyModule } from './currency/currency.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [  
  ],
  imports: [
    CurrencyModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
