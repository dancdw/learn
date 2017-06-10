import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { HeroService } from '../../../service/router/hero.service';
import { Hero } from '../../../service/router/hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  selectedId: number;
  canFly: boolean = false;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes);
  // }

  // 添加英雄，订阅可观察对象
  addHero(Hero) {
    if (!Hero.name) { return; }
    this.heroService.create(Hero.name, Hero.canFly)
                     .subscribe(
                       hero  => this.heroes.push(hero));
  }

  ngOnInit(): void {
    
    // 路由参数可观察对象
    this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.heroService.getHeroes();
      }).subscribe(heroes => this.heroes = heroes);
  }

  // 查看英雄详情
  onSelect(hero: Hero): void {
    this.router.navigate(['/hero', hero.id]);
  }
  
  // 判断是否是选中的英雄
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
}
