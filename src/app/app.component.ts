import { Component, OnInit } from '@angular/core';
//import { Command } from './services/'; //'./cmd.service';
import { WriterService } from './services/writer.service';
import '../assets/js/jquery.terminal-0.10.12.min.js';
import { environment } from '../environments/environment';

declare const jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'app';
  apiValue = environment.API_ADDR

  private terminal: any;


  ngOnInit() {
    jQuery(function ($: any) {
      this.terminal = $('#term').terminal(function (c: any, t: any) {
        //this.tryResolve(c);
      },
        {
          greetings: 'Welcome and use this terminal as an interactive menu, type either [[b;yellow;black]help] or [[b;yellow;black]instructions]\n',
          prompt: '> ',
          name: 'jsTerm',
          keydown: () => {
            // if (this.command.isAnimating()) {
            //   return false;
            // }
          }
        });
    });
  }
}