import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClickMeComponent } from './click-me/click-me.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { FormComponent } from './form/form.component';
import { TemplateComponent } from './template/template.component';
import { AnimationComponent } from './animation/animation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clickme', // 重定向
    pathMatch: 'full'
  },
  {
    path: 'clickme', // url 地址
    component: ClickMeComponent, // 所需组件
  },
  {
    path: 'displaydata',
    component: DisplayDataComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: 'animation',
    component: AnimationComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // 应用根部配置路由
  exports: [ RouterModule ]
})

export class AppRoutingModule {}