import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule }   from '@angular/router';

import { HeroService } from '../services/hero/hero.service';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([ // 应用根部配置路由
      {
        path: 'heroes', // url 地址
        component: HeroesComponent, // 所需组件
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]),
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
