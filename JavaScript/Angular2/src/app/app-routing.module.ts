import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroTeamBuilderComponent } from './hero-team-builder/hero-team-builder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clickme', // 重定向
    pathMatch: 'full'
  },
  {
    path: 'clickme', // url 地址
    component: HeroTeamBuilderComponent, // 所需组件
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // 应用根部配置路由
  exports: [ RouterModule ]
})

export class AppRoutingModule {}