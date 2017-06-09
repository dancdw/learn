import { Injectable }           from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot }  from '@angular/router';

import { CrisisDetailComponent } from '../../app/crisis-center/crisis-detail/crisis-detail.component';

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CrisisDetailComponent> {

  canDeactivate(
    component: CrisisDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {

    console.log(route.params['id']);
    console.log(state.url);

    // 编辑信息未改变
    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }
    
    // 提示用户是否放弃修改
    return component.dialogService.confirm('是否放弃修改？');
  }
}