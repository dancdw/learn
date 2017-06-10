import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisService } from '../../service/router/crisis.service';
import { CrisisDetailResolver } from '../../service/router/crisis-detail-resolver.service';
import { CanDeactivateGuardService } from '../../service/router/can-deactivate-guard.service';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisListComponent }       from './crisis-list/crisis-list.component';
import { CrisisDetailComponent }     from './crisis-detail/crisis-detail.component';
import { CrisisCenterComponent }     from './crisis-center.component';

const CrisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            resolve: { crisis: CrisisDetailResolver }, // 添加预先加载信息的守卫
            canDeactivate: [CanDeactivateGuardService] // 添加离开路由的守卫
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CrisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ 
    CrisisService,
    CrisisDetailResolver,
    CanDeactivateGuardService
  ],
})

export class CrisisCenterRoutingModule { }