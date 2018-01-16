import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CommandService, WriterService, HttpService, SamplesService, GoogleAnalyticsEventsService } from '../services/';
import { SampleModel } from '../models/index';
import { ActivatedRoute } from '@angular/router';

declare const ga: any;

@Component({
  template: '',
  providers: [HttpService, SamplesService]
})

export class SamplesComponent implements OnInit {

  private submitEvent = () => {
    this.googleAnalyticsEvent.emitEvent('Samples', 'SamplesAction', 'Samples', 10);
  }

  constructor(private activatedRoute: ActivatedRoute,
    @Inject(CommandService) private command: CommandService,
    private samplesService: SamplesService,
    private router: Router,
    private googleAnalyticsEvent: GoogleAnalyticsEventsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    this.submitEvent();
    this.getSamples();
  }

  private drawSamples = (sampleModel: SampleModel[]) => {
    this.command.drawLine(100);

    let tempStr = '\n';

    for (const key in sampleModel) {
      if (sampleModel.hasOwnProperty(key)) {
        const element = sampleModel[key];
        tempStr += `Project: [[b;black;yellow]${element.project}]\n`;
        tempStr += `Description: [[b;black;yellow]${element.description}]\n`;
        tempStr += `Language(s): [[b;black;yellow]${element.technology}]\n`;
        tempStr += `Framework(s): [[b;black;yellow]${element.framework}]\n`;
        tempStr += `Link: ${element.link}\n`;
        this.command.echo(tempStr);
        this.command.drawLine(100);
      }
    }
  }

  private getSamples = async () => {
    try {
      this.command.echo('loading...');
      const data = await this.samplesService.getSamples();
      this.drawSamples(data);
    } catch (error) { }

  }

  ngOnInit() {
  }

}
