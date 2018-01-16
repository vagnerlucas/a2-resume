import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CommandService {

  private commands = [/projects?\s*?$/i,
    /home\s*?$/i,
    /about\s*?$/i,
    /help\s*?$/i,
    /instructions?\s*?$/i,
    /samples?\s*?$/i,
    /examples?\s*?$/i,
    /ellen?\s*?$/i];

  public terminal: any;
  private animating = false;

  constructor(private router: Router) { }

  public isAnimating = () => {
    return this.animating;
  }

  private callRoute(route: string) {
    this.router.navigate([route]);
  }

  public echo = (msg: string) => {
    this.terminal.echo(msg);
  }

  public drawLine = (col?: number) => {

    col = col || 80;

    let line = '';
    for (let i = 0; i <= col - 1; i++) {
      line += '-';
    }

    this.terminal.echo(line);
  }

  public animateEcho = (msg: string, interval: number = 25) => {
    this.animating = true;
    this.terminal.set_command('');

    msg.split('').forEach((s, i) => {
      setTimeout(() => {
        this.terminal.insert(s);
      }, i * interval);
    });
    setTimeout(() => {
      this.animating = false;
    }, interval * msg.length + 50);
  }

  private isCommand = (arg: string) => {
    let result = false;
    this.commands.forEach((c) => {
      if (c.test(arg)) {
        result = true;
        return;
      }

    });
    return result;
  }

  public parseCommand = (command: string) => {

    const vm = this;

    const help = 'Available commands:\n'
      + '[[b;yellow;black]about]: Information about me\n'
      + '[[b;yellow;black]projects]: Information about projects and lab\n'
      + '[[b;yellow;black]samples/examples]: Live project samples\n'
      + '[[b;yellow;black]help] / [[b;yellow;black]instruction(s)]: Display this help\n'
      + '[[b;yellow;black]home]: Back to initial route';

    if (this.isCommand(command)) {

      if ((/help\s*?$/i.test(command)) || (/instructions?\s*?$/i.test(command))) {
        vm.terminal.echo(help);
      }
      const commandRoute = this.getCommandRoute(command.trim());

      if (commandRoute.args) {
        this.callRoute(commandRoute.route + commandRoute.args);
      } else {
        this.callRoute(commandRoute.route);
      }
    } else {
      vm.terminal.echo('Command not found.\nTry either [[b;yellow;black]help] or [[b;yellow;black]instructions] to see available commands');
    }
  }

  private getCommandRoute(arg: string) {
    const result = {
      route: '/',
      args: null
    };

    if (/about/i.test(arg)) {
      result.route = '/about';
      result.args = '/run';
    }

    if (/ellen/i.test(arg)) {
      result.route = '/about';
      result.args = '/ellen';
    }

    if (/projects?/i.test(arg)) {
      result.route = '/projects';
    }

    if (/samples?/i.test(arg) || /examples?/i.test(arg)) {
      result.route = '/samples';
    }

    return result;
  }

}
