import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisCenterComponent }     from './crisis-center.component';

// 导入路由模块
import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisDetailComponent,
    CrisisCenterHomeComponent
  ],
  imports: [
    CrisisCenterRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [ 
  ],
})
export class CrisisCenterModule { }
