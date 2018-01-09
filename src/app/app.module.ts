import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'about/:cmd',
    component: AboutComponent
  },
  {
    path: '**',
    component: AboutComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    RouterModule,
    [RouterModule.forRoot(routes)],
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'resume-app' }),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
