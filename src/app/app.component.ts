/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
//import { AppState } from './app.service';
import { Command } from './app.service'; //'./cmd.service';
import { Writer } from './common-services/writer.service'; 
import '../assets/js/jquery.terminal-0.10.12.min.js';

/*
 * App Component
 * Top Level Component
 */

declare var jQuery: any; 

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.style.css'],
  templateUrl: 'app.component.html',
})

export class App {
  
  //constructor(public appState: AppState, private command: Command, private router: Router) { }
  constructor(private command: Command, private writer: Writer) { }

  private terminal: any;
  
  private tryResolve(arg: string) {
    this.command.parseCommand(arg);
  }

  private setTerminal(t: any) {
    this.command.terminal = t;
  }

  ngOnInit() {
    if (!this.writer.isWriting())
      this.writer.writeToElement('text-bio', 'Hello, Vagner Lucas here\nBack-end software developer\nTech lover and passionate about learning\n\nWelcome to my profile!', 20, true);
    var vm = this;
    jQuery(function($:any) {
        vm.terminal = $('#term').terminal(function(c: any, t:any) {
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

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
