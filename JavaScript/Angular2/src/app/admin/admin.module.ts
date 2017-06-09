import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';

// 导入路由模块
import { AdminRoutingModule }       from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageCrisesComponent,
    ManageHeroesComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [ 
  ],
})
export class AdminModule { }
