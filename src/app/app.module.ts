import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CommandService } from './services/command.service';
import { WriterService } from './services/writer.service';
import { ProjectsComponent } from './projects/projects.component';
import { SamplesComponent } from './samples/samples.component';
import { GoogleAnalyticsEventsService } from './services/google-analytics-events.service';

const routes: Routes = [
  {
    path: 'about/:cmd',
    component: AboutComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'samples',
    component: SamplesComponent
  },
  {
    path: '**',
    component: AboutComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    SamplesComponent
  ],
  imports: [
    RouterModule,
    [RouterModule.forRoot(routes)],
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'resume-app' }),
    HttpModule
  ],
  providers: [CommandService, WriterService, GoogleAnalyticsEventsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
