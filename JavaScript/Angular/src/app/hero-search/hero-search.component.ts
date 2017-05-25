import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// 可观察的类扩展
import 'rxjs/add/observable/of';

// 可观察的操作符（只需要导入脚本，不需要操作费本身）
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


import { Hero } from '../../services/hero/hero';
import { HeroSearchService } from '../../services/hero/hero-search.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); // 创建字符串的可观察流

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  // 将新的字符串放入可观察流中
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // 键盘事件在 300ms 内不发送请求
      .distinctUntilChanged()   // 不重复请求同一个搜索词
      .switchMap(term => term   // 只保留最后一次输入的字符串观察者对象
        ? this.heroSearchService.search(term)  // 返回http搜索可观察
        : Observable.of<Hero[]>([])) // 如果没有搜索词，返回空的英雄可观察者对象
      .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  // 前往详情
  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', hero.id]);
  }

}
