import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd } from '@angular/router';
import { HttpService, AboutService, CommandService, WriterService, GoogleAnalyticsEventsService } from '../services/';
import { AboutModel } from '../models/';
// import { switchMap } from 'rxjs/operators';

declare const ga: any;

@Component({
  template: '',
  providers: [HttpService, AboutService]
})

export class AboutComponent implements OnInit {

  private getParam = param => {
    return this.activatedRoute.snapshot.paramMap.get(param);
  }

  private submitEvent = () => {
    this.googleAnalyticsEvent.emitEvent('About', 'AboutAction', 'About', 10);
  }

  constructor(private activatedRoute: ActivatedRoute,
    private about: AboutService,
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
    this.tryParseCommand();
  }

  private drawAbout = (aboutModel: AboutModel) => {

    const formatGauge = (n: number) => {
      let result = '';
      for (let i = 1; i <= 10; i++) {
        if (i <= n) {
          result += '[[b;black;blue] ]';
        } else {
          result += '[[b;black;gray] ]';
        }
      }
      return result;
    };

    if (aboutModel) {
      this.command.drawLine(100);
      this.command.echo(`\nName:\t [[b;black;gray]${aboutModel.name}]\t\tLocation: [[b;black;gray]${aboutModel.location}]`);
      this.command.echo(`Position: [[b;black;gray]${aboutModel.position}]`);
      this.command.echo(`Resume: ${aboutModel.resumeUrl}`);
      let tempStr = '';
      aboutModel.contacts.forEach((e) => {
        Object.keys(e).forEach((f) => {
          tempStr += `[[b;red;black]${f.toString()}]: [[b;black;gray]${e[f].toString()}]\n`;
        });
      });
      this.command.echo(`\nContacts\n${tempStr}`);
      this.command.drawLine(100);
      this.command.echo(`\n${aboutModel.resume}\n`);
      this.command.drawLine(100);
      tempStr = '';
      aboutModel.skills.forEach((e, j) => {
        Object.keys(e).forEach((f, i) => {
          tempStr += `[[b;red;black]${f.toString()}]: ${formatGauge(e[f].toString())}\t`;
          if ((j + 1) % 4 === 0) {
            tempStr += '\n\n';
          }
        });
      });
      this.command.echo('\nSkills\n');
      this.command.echo(tempStr);
      this.command.drawLine(100);
      tempStr = '';
      aboutModel.social.forEach((e) => {
        Object.keys(e).forEach((f) => {
          tempStr += `[[b;red;black]${f.toString()}]: ${e[f].toString()}\n`;
        });
      });
      this.command.echo(`\nSocial\n${tempStr}`);
      this.command.drawLine(100);
      this.command.echo('\nProjects:\n');
      this.command.echo('Type [[b;yellow;black]projects] to see the list\n');

      setTimeout(() => {
        this.command.animateEcho('projects', 25);
      }, 800);
    }
  }

  private tryParseCommand = async () => {
    const parm = this.getParam('cmd');
    if (parm != null) {
      if (/run?\s*?$/i.test(parm)) {
        const data = await this.about.getAbout();
        if (data != null) {
          try {
            this.drawAbout(data);
          } catch (error) { }
        }
      }
    }
  }

  ngOnInit() { }

}
