import { Injectable, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { ProjectModel } from '../models/';

@Injectable()
export class ProjectsService {

  constructor( @Inject(HttpService) protected http: HttpService) { }

  public getProjects = async () => {
    const data = await this.http.getDataFromService('projects').toPromise();

    const result = new Array<ProjectModel>();

    if (data) {
      for (const key in data.projects) {
        if (data.projects.hasOwnProperty(key)) {
          const element = data.projects[key];
          result.push(element);
        }
      }
    }

    return result;
  }

}
