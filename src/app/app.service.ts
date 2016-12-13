import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { HmrState } from 'angular2-hmr';

@Injectable()
export class Command {

	private commands = [/projects?\s*?$/i, /home\s*?$/i, /about\s*?$/i, /help\s*?$/i, /instructions?\s*?$/i,  /samples?\s*?$/i,  /examples?\s*?$/i];
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

		var line = '';
		for (var i = 0; i <= col - 1; i++)
			line += '-';

		this.terminal.echo(line);
	}

	public animateEcho = (msg: string, interval: number) => {
		var vm = this;
		vm.animating = true;
		vm.terminal.set_command('');
		interval = interval || 25;
		msg.split('').forEach((s, i) => {
			setTimeout(() => {
				vm.terminal.insert(s);
			}, i * interval);
		});
		setTimeout(() => {
			vm.animating = false;
		}, interval * msg.length + 50);
	}

	private isCommand = (arg: string) => {
		var result = false;
		this.commands.forEach((c) => {
			if (c.test(arg)) {
				result = true;
				return;
			}

		});

		return result;
	}

	public parseCommand = (command: string) => {

		var vm = this;

		var help = 'Available commands:\n'
				+  '[[b;yellow;black]about]: Information about me\n'
				+  '[[b;yellow;black]projects]: Information about projects and lab\n'
				+  '[[b;yellow;black]samples/examples]: Live project samples\n'
				+  '[[b;yellow;black]help] / [[b;yellow;black]instruction(s)]: Display this help\n'
				+  '[[b;yellow;black]home]: Back to initial route';

		if (this.isCommand(command)) {
			
			if ((/help\s*?$/i.test(command)) || (/instructions?\s*?$/i.test(command))) {
				vm.terminal.echo(help);
			}

			var commandRoute = this.getCommandRoute(command.trim());

			if (commandRoute.args)
				this.callRoute(commandRoute.route + commandRoute.args);
			else
				this.callRoute(commandRoute.route);
		}
		else {
			vm.terminal.echo('Command not found.\nTry either [[b;yellow;black]help] or [[b;yellow;black]instructions] to see available commands');
		}
	}

	private getCommandRoute(arg: string) {
		var result = {
			route: '/',
			args: null
		};

		if (/about/i.test(arg)) {
			result.route = '/about';
			result.args = '/run';
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