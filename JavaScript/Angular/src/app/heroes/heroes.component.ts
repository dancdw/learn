import { Component, OnInit } from '@angular/core';

import { Hero } from '../../services/hero/hero';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
	title = 'My Heroes';
  	heroes: Hero[];

  	selectedHero: Hero; // 默认被选中的英雄

  	constructor(private heroService: HeroService) {}

  	// 初始化
	ngOnInit(): void {
    		this.getHeroes();
  	}
  	
  	// 点击一个英雄时触发
  	onSelect(hero: Hero): void {
  		this.selectedHero = hero;
	}

	// 获取 hero 数据
	getHeroes(): void {
    		this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes); // 订阅一个事件
  	}
}
