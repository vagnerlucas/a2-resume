import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AboutModel } from '../about';
import { ProjectModel } from '../projects';
import { SampleModel } from '../samples';
import { Command } from '../app.service';

@Injectable()
export class BaseHttpService {
	protected nodeApiServerName = 'http://api.vagnerlucas.com:3001/';
	protected headers = new Headers();

    constructor( @Inject(Http) protected http: Http) { }
}

@Injectable()
export class AboutService extends BaseHttpService {

	public about: AboutModel;

	constructor( @Inject(Http) protected http: Http, @Inject(Command) command: Command) {
		super(http);
	}

	public getAbout = () => {
		let control = 'about';
		let url = this.nodeApiServerName + control;

		return this.http.get(url, { headers: this.headers })
						.map(res => res.json());
	}
}

@Injectable()
export class ProjectService extends BaseHttpService {
	
	public projectModel: ProjectModel;
	
	constructor( @Inject(Http) protected http: Http, @Inject(Command) command: Command) {
		super(http);
	}
	
	public getProjects = () => {
		let control = 'projects';
		let url = this.nodeApiServerName + control;
		
		return this.http.get(url, { headers: this.headers })
						.map(res => res.json());
	}
}

@Injectable()
export class SampleService extends BaseHttpService {
	
	public sampleModel: SampleModel;
	
	constructor( @Inject(Http) protected http: Http, @Inject(Command) command: Command) {
		super(http);
	}

	public getSamples = () => {
		let control = 'samples';
		let url = this.nodeApiServerName + control;
		
		return this.http.get(url, { headers: this.headers })
						.map(res => res.json());
	}
}