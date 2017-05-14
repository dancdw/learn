import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; // 导入 RxJS 库来扩展 Observable

import { Hero } from './hero';

@Injectable() // 记下元数据，用于依赖检测

export class HeroService {
	private heroesUrl = 'api/heroes';  // 接口 url


  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

  	// 删除记录
  	delete(id: number): Promise<void> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers}) // delete 删除记录并告诉浏览器接收数据的格式
	    .toPromise() // 转换为承诺（Promise）
	    .then(() => null)
	    .catch(this.handleError);
	}

  	// 添加纪录
  	create(name: string): Promise<Hero> {
	  return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers}) // post 添加纪录并告诉浏览器接收数据的格式
	    .toPromise() // 转换成承诺（Promise）
	    .then(res => res.json().data as Hero) // json 方法取得数据并作为承诺（Promise）进行解析
	    .catch(this.handleError);
	}

  	// 更新记录
	update(hero: Hero): Promise<Hero> {
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http.put(url, JSON.stringify(hero), {headers: this.headers}) // put 更新记录并告诉浏览器接收数据的格式
	    .toPromise() // 转换成承诺（Promise）
	    .then(() => hero)
	    .catch(this.handleError);
	}

	// 获取所有英雄
	getHeroes(): Promise<Hero[]> {
  		// return Promise.resolve(HEROES); // 封装 HEROES 数据成能解析（resolve）的承诺（Promise）

  		return this.http.get(this.heroesUrl) // 得到一个 Observable 可观察者对象
               .toPromise() // 转换成承诺 （Promise）
               .then(response => response.json().data as Hero[]) // json 方法取得数组数据并作为承诺（Promise）进行解析
               .catch(this.handleError); // 错误处理
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
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.get(url) // 得到一个 Observable 可观察者对象
	    .toPromise() // 转换成承诺（Promise）
	    .then(response => response.json().data as Hero) // json 方法取得数据作为承诺（Promise）进行解析
	    .catch(this.handleError);
	}

	// 错误处理
	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // 错误输出
	    return Promise.reject(error.message || error); // 封装错误信息成一个被拒绝的承诺（Promise）
	}
}
