import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable() // 记下元数据，用于依赖检测

export class HeroService {

	// 获取所有英雄
	getHeroes(): Promise<Hero[]> {
  		return Promise.resolve(HEROES);
	}

	// 延迟 2 秒获取所有英雄
	getHeroesSlowly(): Promise<Hero[]> {
		// 发布一个承诺
		return new Promise(resolve => {
	    		setTimeout(() => resolve(this.getHeroes()), 2000);
	 	});
	}

	// 通过 id 获取英雄
	getHero(id: number): Promise<Hero> {
	  return this.getHeroes()
	             .then(heroes => heroes.find(hero => hero.id === id));
	}

  	constructor() { }
}
