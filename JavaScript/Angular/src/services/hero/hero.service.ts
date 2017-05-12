import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable() // 记下元数据，用于依赖检测

export class HeroService {

	// 获取
	getHeroes(): Promise<Hero[]> {
  		return Promise.resolve(HEROES);
	}


	getHeroesSlowly(): Promise<Hero[]> {
		// 发布一个承诺
		return new Promise(resolve => {
	    		setTimeout(() => resolve(this.getHeroes()), 2000);
	 	});
	}

  	constructor() { }
}
