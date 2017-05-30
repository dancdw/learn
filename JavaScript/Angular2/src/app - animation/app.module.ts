import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';

import { HeroService } from '../service/animation/hero.service';
import { AppComponent } from './app.component';
import { HeroListBasicComponent } from './hero-list-basic/hero-list-basic.component';
import { HeroTeamBuilderComponent } from './hero-team-builder/hero-team-builder.component';
import { ListEnterLeaveComponent } from './list-enter-leave/list-enter-leave.component';
import { HeroEnterLeaveStatesComponent } from './hero-enter-leave-states/hero-enter-leave-states.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroListBasicComponent,
    HeroTeamBuilderComponent,
    ListEnterLeaveComponent,
    HeroEnterLeaveStatesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  // 注册一个应用中唯一的提供商为其提供服务
  providers: [ 
    HeroService
  // { provide: Logger, useValue: silentLogger }, // 定义提供商并指定对象
  // { provide: OldLogger, useClass: NewLogger}, // 定义提供商并指定类
  // { provide: OldLogger, useExisting: NewLogger}, // 定义提供商并指定别名
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
