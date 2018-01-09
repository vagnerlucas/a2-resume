import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  value: string;

  private getParam = param => {
    return this.activatedRoute.snapshot.paramMap.get(param);
  }

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.value = this.getParam('cmd');
  }

}
