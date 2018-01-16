import { Injectable, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { SampleModel } from '../models/index';

@Injectable()
export class SamplesService {

  constructor( @Inject(HttpService) protected http: HttpService) { }

  public getSamples = async () => {
    const data = await this.http.getDataFromService('samples').toPromise();

    const result = new Array<SampleModel>();

    if (data) {
      for (const key in data.samples) {
        if (data.samples.hasOwnProperty(key)) {
          const element = data.samples[key];
          result.push(element);
        }
      }
    }

    return result;
  }

}
