import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AvolaAngularModule } from 'avola-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvolaAngularModule.forRoot({
      clientId: '',
      clientSecret: '',
      baseUrl: 'https://free.api.avo.la',
      tokenHost: 'https://free.auth.avo.la'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
