import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  	constructor(private heroService: HeroService, private router: Router,) {}

  	// 初始化
	ngOnInit(): void {
    		this.getHeroes();
  	}
  	
  	// 显示默认英雄
  	onSelect(hero: Hero): void {
  		this.selectedHero = hero;
	}

     // 删除英雄
     delete(hero: Hero): void {
          this.heroService
          .delete(hero.id)
          .then(() => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          });
     }

     // 添加英雄
     add(name: string): void {
          name = name.trim();
          if (!name) { return; }

          this.heroService.create(name)
            .then(hero => {
              this.heroes.push(hero);
              this.selectedHero = null;
          });
     }

	// 获取 hero 数据
	getHeroes(): void {
    		this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes); // 订阅一个事件
  	}

     // 前往英雄详情
     gotoDetail(): void {
          this.router.navigate(['/detail', this.selectedHero.id]); // navigate 与 routerLink 功能一样
     }
}
