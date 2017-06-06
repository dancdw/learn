import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

// 导入用于加载和配置内存中的web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../../service/router/in-memory-data.service';

import { HeroService } from '../../service/router/hero.service';
import { WikipediaService } from '../../service/router/wikipedia.service';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// 导入子模块
import { HerosRoutingModule } from './heros-routing.module';

@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HerosRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [ 
    HeroService,
    WikipediaService
  ],
})
export class HerosModule { }
