import { Injectable } from '@angular/core';

class Hero {
  constructor(public name: string,public state = 'inactive') {}

  // 切换状态
  toggleState() {
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }
}

let ALL_HEROES = [
  'Windstorm',
  'RubberMan',
  'Bombasto',
  'Magneta',
  'Dynama',
  'Narco',
  'Celeritas',
  'Dr IQ',
  'Magma',
  'Tornado',
  'Mr. Nice'
].map(name => new Hero(name));

@Injectable()
export class HeroService implements Iterable<Hero> {

  currentHeroes: Hero[] = [];

  [Symbol.iterator]() {
    return this.currentHeroes.values();
  }

  // 是否能添加
  canAdd() {
    return this.currentHeroes.length < ALL_HEROES.length;
  }

  // 是否能删除
  canRemove() {
    return this.currentHeroes.length > 0;
  }

  // 添加一个 active 状态的英雄
  addActive() {
    let hero = ALL_HEROES[this.currentHeroes.length];
    hero.state = 'active';
    this.currentHeroes.push(hero);
  }

  // 添加一个 inactive 状态的英雄
  addInactive() {
    let hero = ALL_HEROES[this.currentHeroes.length];
    hero.state = 'inactive';
    this.currentHeroes.push(hero);
  }

  // 删除一个英雄
  remove() {
    this.currentHeroes.splice(this.currentHeroes.length - 1, 1);
  }

}