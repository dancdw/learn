import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero }           from './hero';

@Injectable()

export class HeroSearchService {
	
  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {

    return this.http.get(`app/heroes/?name=${term}`) // 返回 Observable 可观察对象
               .map(response => response.json().data as Hero[]); // 从可观察对象中提取数据
  }
}