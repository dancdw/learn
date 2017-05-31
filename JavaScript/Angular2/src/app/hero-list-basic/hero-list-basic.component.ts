import { Component,Input, OnInit } from '@angular/core';
import { HeroService } from '../../service/http/hero.service';

import { Hero } from '../../service/http/hero';

@Component({
  selector: 'app-hero-list-basic',
  templateUrl: './hero-list-basic.component.html',
  styleUrls: ['./hero-list-basic.component.css']
})
export class HeroListBasicComponent implements OnInit {
  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  constructor (private heroService: HeroService) {}

  ngOnInit() { this.getHeroes(); }

  // 获取所有英雄，订阅可观察对象，指定成功和错误事件
  getHeroes() {
    this.heroService.getHeroes()
                     .subscribe(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

  // 添加英雄，订阅可观察对象，指定成功和错误事件
  addHero(name: string) {
    if (!name) { return; }
    this.heroService.create(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }

}
