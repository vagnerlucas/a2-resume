import { Component, OnInit } from '@angular/core';
import { CommandService } from './services/command.service';
import { WriterService } from './services/writer.service';
import '../assets/js/jquery.terminal-0.10.12.min.js';
import { environment } from '../environments/environment';

declare const jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommandService, WriterService]
})

export class AppComponent implements OnInit {
  title = 'app';
  apiValue = environment.API_ADDR

  private terminal: any;

  constructor(private command: CommandService, private writer: WriterService) { }

  private tryResolve(cmd) {
    this.command.parseCommand(cmd);
  }

  private setTerminal(t: any) {
    this.command.terminal = t;
  }

  ngOnInit() {
    if (!this.writer.isWriting())
      this.writer.writeToElement('text-bio', 'Hello, Vagner Lucas here, \nBack-end software developer \nTech lover and passionate about learning \n\nWelcome to my profile!', 20, true);
    var vm = this;
    jQuery(function ($: any) {
      vm.terminal = $('#term').terminal(function (c: any, t: any) {
        vm.tryResolve(c);
      },
        {
          greetings: 'Welcome and use this terminal as an interactive menu, type either [[b;yellow;black]help] or [[b;yellow;black]instructions]\n',
          prompt: '> ',
          name: 'jsTerm',
          keydown: () => {
            if (vm.command.isAnimating()) {
              return false;
            }
          }
        });
    }).ready(() => {
      this.setTerminal(this.terminal);
      this.command.echo('Typing [[b;yellow;black]about] is a good way to start');
      this.command.animateEcho('about', 25);
    });
  }
}