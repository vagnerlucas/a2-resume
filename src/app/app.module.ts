import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({appId: 'resume-app'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
