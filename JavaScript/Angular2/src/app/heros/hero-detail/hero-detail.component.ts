import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Hero } from '../../../service/router/hero';
import { HeroService } from '../../../service/router/hero.service';

import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  animations: [ slideInDownAnimation ] // 添加动画
})
export class HeroDetailComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  
  // @Input() hero: Hero;
  hero: Hero;

  constructor(
	  private route: ActivatedRoute,
	  private router: Router,
	  private service: HeroService
  ) { }

  gotoHeroes() {
  	let heroId = this.hero ? this.hero.id : null;
     this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

  ngOnInit() {
  	this.route.params
    .switchMap((params: Params) => this.service.getHero(+params['id']))
    .subscribe((hero: Hero) => this.hero = hero);

    // 快照
    // let id = +this.route.snapshot.params['id'];
    // this.service.getHero(id)
    //   .then((hero: Hero) => this.hero = hero);
  }

}
