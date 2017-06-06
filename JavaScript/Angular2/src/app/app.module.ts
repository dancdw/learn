import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';
import { HerosModule }     from './heros/heros.module';
// console.log(HerosModule)
 // 使用 HTTP 服务
import { HttpModule,JsonpModule } from '@angular/http';

// import { HeroService } from '../service/router/hero.service';
// import { WikipediaService } from '../service/router/wikipedia.service';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HerosModule,
    AppRoutingModule, // 必须是最后一个
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  // 注册一个应用中唯一的提供商为其提供服务
  providers: [ 
  // { provide: Logger, useValue: silentLogger }, // 定义提供商并指定对象
  // { provide: OldLogger, useClass: NewLogger}, // 定义提供商并指定类
  // { provide: OldLogger, useExisting: NewLogger}, // 定义提供商并指定别名
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
