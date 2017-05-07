import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'news-console',
  template: `
      <div class="sidebar">
        <p>News Feed: </p>
      </div>
  `
})
export class NewsComponent {
	
}