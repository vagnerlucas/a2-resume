import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AboutModel } from '../models/about-model';

@Injectable()
export class AboutService {

  constructor( @Inject(HttpService) protected http: HttpService) { }

  public getAbout = async () => {
    const data = await this.http.getDataFromService('about').toPromise();
    const aboutModel = new AboutModel();
    aboutModel.name = data.name;
    aboutModel.location = data.location;
    aboutModel.resume = data.resume;
    aboutModel.position = data.position;
    aboutModel.skills = data.skills;
    aboutModel.social = data.social;
    aboutModel.contacts = data.contacts;
    aboutModel.resumeUrl = data.resumeUrl;

    return aboutModel;
  }
}
