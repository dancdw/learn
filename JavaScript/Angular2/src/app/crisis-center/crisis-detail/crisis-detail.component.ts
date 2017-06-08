import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { slideInDownAnimation } from '../../animations';

import { Crisis, CrisisService } from '../../../service/router/crisis.service';
// import { DialogService }  from '../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css'],
  animations: [ slideInDownAnimation ] // 添加动画
})

export class CrisisDetailComponent implements OnInit {
	
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
    // public dialogService: DialogService
  ) {}

  ngOnInit() {
  	this.route.params
  	  .switchMap((params: Params) => this.service.getCrisis(+params['id']))
       .subscribe((crisis: Crisis) => {
       	this.editName = crisis.name;
        	this.crisis = crisis;
       });

      // this.route.data
      // .subscribe((data: { crisis: Crisis }) => {
      //   this.editName = data.crisis.name;
      //   this.crisis = data.crisis;
      // });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // return this.dialogService.confirm('Discard changes?');
  }
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

}
