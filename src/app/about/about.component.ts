import { Component, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Writer } from '../common-services/writer.service';
import { Command } from '../app.service';
import { AboutService } from '../common-services/http.service';
import { AboutModel } from './about.model';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  providers: [AboutService]
})

export class About {

  constructor(private activatedRoute: ActivatedRoute, @Inject(Command) private command: Command, 
                @Inject(Writer) private writer: Writer, private aboutService: AboutService, private router: Router) { }

  private drawAbout = (aboutModel: AboutModel) => {

    var formatGauge = (n: number) => {
      var result = '';
      for (var i = 1; i <= 10; i++) {
        if (i <= n)
          result += '[[b;black;blue] ]';
        else
          result += '[[b;black;gray] ]';
      }

      return result;
    }

    if (aboutModel) {
      this.command.drawLine(100);
      this.command.echo(`\nName:\t [[b;black;gray]${aboutModel.name}]\t\tLocation: [[b;black;gray]${aboutModel.location}]`);
      this.command.echo(`Position: [[b;black;gray]${aboutModel.position}]`);
      var tempStr = '';
      aboutModel.contacts.forEach((e) => {
        Object.keys(e).forEach((f) => {
          tempStr += `[[b;red;black]${f.toString() }]: [[b;black;gray]${e[f].toString() }]\n`
        })
      });
      this.command.echo(`\nContacts\n${tempStr}`);
      this.command.drawLine(100);
      this.command.echo(`\n${aboutModel.resume}\n`);
      this.command.drawLine(100);
      tempStr = '';
      aboutModel.skills.forEach((e, j) => {
        Object.keys(e).forEach((f, i) => {
          tempStr += `[[b;red;black]${f.toString() }]: ${formatGauge(e[f].toString()) }\t`
          if ((j + 1) % 4 == 0)
            tempStr += '\n\n';
        })
      });
      this.command.echo('\nSkills\n');
      this.command.echo(tempStr);
      this.command.drawLine(100);
      tempStr = '';
      aboutModel.social.forEach((e) => {
        Object.keys(e).forEach((f) => {
          tempStr += `[[b;red;black]${f.toString() }]: ${e[f].toString() }\n`
        })
      });
      this.command.echo(`\nSocial\n${tempStr}`)
      this.command.drawLine(100);
      this.command.echo('\nProjects\n');
      this.command.echo('Type [[b;yellow;black]projects] to see the list\n');
      
      setTimeout(() => {
        this.command.animateEcho('projects', 25);
      }, 800);
      
    }
  }

  ngOnInit() {
    this.activatedRoute.params
      .map(params => params['cmd'])
      .subscribe((cmd) => {
        if (cmd && /run/i.test(cmd)) {
          this.command.echo('loading...');
          this.aboutService.getAbout()
            .subscribe(data => {
              var aboutModel = new AboutModel();
              aboutModel.name = data.name;
              aboutModel.location = data.location;
              aboutModel.resume = data.resume;
              aboutModel.position = data.position;
              aboutModel.skills = data.skills;
              aboutModel.social = data.social;
              aboutModel.contacts = data.contacts;

              this.drawAbout(aboutModel);
              this.router.navigate(['/']);  
            });
        }
      });
  }
}