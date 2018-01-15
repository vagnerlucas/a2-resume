import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommandService } from './services/command.service';
import { WriterService } from './services/writer.service';
import '../assets/js/jquery.terminal-0.10.12.min.js';

declare const jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  private terminal: any;

  constructor(private command: CommandService, private writer: WriterService, private router: Router) { }

  private tryResolve(cmd) {
    this.command.parseCommand(cmd);
  }

  private setTerminal(t: any) {
    this.command.terminal = t;
  }

  ngOnInit() {
    if (!this.writer.isWriting()) {
      this.writer.writeToElement('bio-greeting', 'Hello', 25, false, true)
                 .writeToElement('vrl-title', 'Vagner Lucas', 35, false, true)
                 .writeToElement('vrl-info', 'Back-end software developer, system analyst and tech lover', 45, false, true)
                 .writeToElement('profile-text', 'You can find information about my professional profile here', 45, false, true)
                 .writeToElement('bio-footer', 'Welcome to my webpage', 45, false, true);
    }

    const vm = this;
    jQuery(function ($: any) {
      vm.terminal = $('#term').terminal(function (c: any, t: any) {
        vm.tryResolve(c);
      },
        {
          greetings:  'Welcome and use this terminal as an interactive menu, ' +
                      'type either [[b;yellow;black]help] or [[b;yellow;black]instructions]\n',
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

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  };

  this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
      }
  });

  }
}
