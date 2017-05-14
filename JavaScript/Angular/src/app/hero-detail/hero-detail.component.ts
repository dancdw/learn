import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from '../../services/hero/hero';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
	hero: Hero;
	
  	constructor(
  		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location
  	) { }

  	ngOnInit(): void {
  	  // 从 ActivatedRoute 的 params 可观察者对象中取 id 参数
	  this.route.params
	    .switchMap((params: Params) => this.heroService.getHero(+params['id'])) // 将参数id 映射成新的 Observable（可观察者对象）
	    .subscribe(hero => this.hero = hero); // 订阅事件
	}

	// 更新记录
	save(): void {
	  this.heroService.update(this.hero)
	    .then((hero) => this.goBack());
	}

	// 返回上一个路由
	goBack(): void {
	  this.location.back();
	}
}
