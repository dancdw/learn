import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' }, // 重定向 prefix前缀
  { path: '**', component: PageNotFoundComponent } // 匹配所有
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // 应用根部配置路由
  exports: [ RouterModule ]
})

export class AppRoutingModule {}