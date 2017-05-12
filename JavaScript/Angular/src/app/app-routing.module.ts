import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard', // 重定向
    pathMatch: 'full'
  },
  {
    path: 'heroes', // url 地址
    component: HeroesComponent, // 所需组件
  },
  {
    path: 'detail/:id', // :id 占位符用于参数化
    component: HeroDetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // 应用根部配置路由
  exports: [ RouterModule ]
})

export class AppRoutingModule {}