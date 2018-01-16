import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpService, ProjectsService, CommandService, WriterService, GoogleAnalyticsEventsService } from '../services/';
import { ProjectModel } from '../models/';

declare const ga: any;

@Component({
  template: '',
  providers: [HttpService, ProjectsService]
})

export class ProjectsComponent implements OnInit {

  private submitEvent = () => {
    this.googleAnalyticsEvent.emitEvent('Projects', 'ProjectActions', 'Projects', 10);
  }

  constructor(private activatedRoute: ActivatedRoute,
    private projects: ProjectsService,
    private router: Router,
    @Inject(CommandService) private command: CommandService,
    @Inject(WriterService) private writer: WriterService,
    private googleAnalyticsEvent: GoogleAnalyticsEventsService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    this.submitEvent();
    this.getProjects();
  }

  private drawProjects = (projectModel: ProjectModel[]) => {
    this.command.drawLine(100);

    let tempStr = '\n';

    for (const key in projectModel) {
      if (projectModel.hasOwnProperty(key)) {
        const element = projectModel[key];
        tempStr = `Project: [[b;black;gray]${element.project}]\n`;
        tempStr += `Description: [[b;black;gray]${element.description}]\n`;
        tempStr += `Language(s): [[b;black;gray]${element.technology}]\n`;
        tempStr += `Framework(s): [[b;black;gray]${element.framework}]\n`;
        tempStr += `Link: ${element.link}\n`;
        this.command.echo(tempStr);
        this.command.drawLine(100);
      }
    }
  }

  private getProjects = async () => {
    try {
      this.command.echo('loading...');
      const data = await this.projects.getProjects();
      this.drawProjects(data);
    } catch (error) { }

  }

  ngOnInit() { }

}
