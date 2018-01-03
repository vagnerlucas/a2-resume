
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  protected apiServerName = environment.API_ADDR;
  protected headers = new Headers();

  constructor( @Inject(Http) protected http: Http) { }

  public getDataFromService(service: string) {
      const url = this.apiServerName + service;
      return this.http
                 .get(url, {headers: this.headers})
                 .map(res => res.json());
  }
}