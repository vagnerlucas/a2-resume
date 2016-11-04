import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command } from '../app.service';
import { ProjectService } from '../common-services/http.service';
import { ProjectModel } from './project.model';

@Component({
	selector: 'projects',
	templateUrl: 'projects.template.html',
	providers: [ProjectService]
})

export class Projects {

	constructor(private activatedRoute: ActivatedRoute, @Inject(Command) private command: Command, private projectService: ProjectService, private router: Router) { }

	private drawProjects = (projectModel: ProjectModel[]) => {
		var tempStr = '\n';
		for(var p in projectModel) {
			tempStr += `Project: [[b;black;gray]${projectModel[p].project}]\n`;
			tempStr += `Description: [[b;black;gray]${projectModel[p].description}]\n`;
			tempStr += `Language(s): [[b;black;gray]${projectModel[p].technology}]\n`;
			tempStr += `Framework(s): [[b;black;gray]${projectModel[p].framework}]\n`;
			tempStr += `Link: ${projectModel[p].link}\n`
			tempStr += '----------------------------------------------------------------------------------------------------\n\n';
		}
		
		this.command.echo(tempStr);
	}

	public ngOnInit() {
		this.command.echo('loading...');
		this.projectService.getProjects().subscribe((f) => this.drawProjects(f.projects));
		this.router.navigate(['/']);  
	}
}