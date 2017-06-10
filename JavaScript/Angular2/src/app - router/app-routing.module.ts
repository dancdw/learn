import { NgModule }             from '@angular/core';
import { RouterModule, Router, Routes, PreloadAllModules } from '@angular/router';

import { LoginComponent }     from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { AuthService } from '../service/router/auth.service';
import { AuthGuardService } from '../service/router/auth-guard.service';
import { SelectivePreloadingStrategy } from '../service/router/selective-preloading-strategy';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // 立即加载
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuardService] }, // canLoad 实现惰性加载
  { path: 'crisis-center', loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule', data: { preload: true } }, // preload 实现预先加载
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' }, // outlet 路由出口
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' }, // 重定向 prefix前缀
  { path: '**', component: PageNotFoundComponent } // 匹配所有
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategy }) ], // 应用根部配置路由
  exports: [ RouterModule ],
  providers: [ AuthService, AuthGuardService, SelectivePreloadingStrategy ]
})

export class AppRoutingModule {

  // 仅诊断：检查路由器配置
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}