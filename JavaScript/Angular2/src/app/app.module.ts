import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { AppRoutingModule }     from './app-routing.module';

import { HeroService } from '../service/http/hero.service';
import { AppComponent } from './app.component';
import { HeroListBasicComponent } from './hero-list-basic/hero-list-basic.component';
import { WikiComponent } from './wiki/wiki.component';

 // 使用 HTTP 服务
import { HttpModule,JsonpModule } from '@angular/http';

// 导入用于加载和配置内存中的web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../service/http/in-memory-data.service';

import { WikipediaService } from '../service/http/wikipedia.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroListBasicComponent,
    WikiComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  // 注册一个应用中唯一的提供商为其提供服务
  providers: [ 
    HeroService,
    WikipediaService
  // { provide: Logger, useValue: silentLogger }, // 定义提供商并指定对象
  // { provide: OldLogger, useClass: NewLogger}, // 定义提供商并指定类
  // { provide: OldLogger, useExisting: NewLogger}, // 定义提供商并指定别名
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
