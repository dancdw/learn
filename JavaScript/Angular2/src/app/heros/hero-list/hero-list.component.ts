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

  constructor(private heroService: HeroService, private route: ActivatedRoute, private router: Router) { }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes);
  // }

  ngOnInit(): void {

    // 路由参数可观察对象
    this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.heroService.getHeroes();
      }).subscribe(heroes => this.heroes = heroes);
  }


  onSelect(hero: Hero): void {
    this.router.navigate(['/hero', hero.id]);
  }
  
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
}
