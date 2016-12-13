import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from '../app.service';
import { SampleService } from '../common-services/http.service';
import { SampleModel } from './sample.model';

@Component({
	selector: 'samples',
	templateUrl: 'sample.template.html',
	providers: [SampleService]
})

export class Samples {

	constructor(private activatedRoute: ActivatedRoute, @Inject(Command) private command: Command, private sampleService: SampleService, private router: Router) { }

	private drawSamples = (sampleModel: SampleModel[]) => {
		var tempStr = '\n';
		for(var p in sampleModel) {
			tempStr += `Project: [[b;black;yellow]${sampleModel[p].project}]\n`;
			tempStr += `Description: [[b;black;yellow]${sampleModel[p].description}]\n`;
			tempStr += `Language(s): [[b;black;yellow]${sampleModel[p].technology}]\n`;
			tempStr += `Framework(s): [[b;black;yellow]${sampleModel[p].framework}]\n`;
			tempStr += `Link: ${sampleModel[p].link}\n`
			tempStr += '----------------------------------------------------------------------------------------------------\n\n';
		}
		
		this.command.echo(tempStr);
	}

	public ngOnInit() {
		this.command.echo('loading...');
		this.sampleService.getSamples().subscribe((f) => this.drawSamples(f.samples));
		this.router.navigate(['/']);  
	}
}