import { Component, OnInit } from '@angular/core';

import { ActivatedRoute }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SelectivePreloadingStrategy } from '../../../service/router/selective-preloading-strategy';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sessionId: Observable<string>;
  token: Observable<string>;
  modules: string[];

  constructor(private route: ActivatedRoute, private preloadStrategy: SelectivePreloadingStrategy) {
    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {

    // 获取查询参数
    this.sessionId = this.route
      .queryParams
      .map(params => params['session_id'] || 'None');

    // 获取片段
    this.token = this.route
      .fragment
      .map(fragment => fragment || 'None');
  }

}
