import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';
import { HerosModule }     from './heros/heros.module';
import { CrisisCenterModule }     from './crisis-center/crisis-center.module';

 // 使用 HTTP 服务
import { HttpModule,JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HerosModule,
    CrisisCenterModule,
    AppRoutingModule, // 必须是最后一个
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
