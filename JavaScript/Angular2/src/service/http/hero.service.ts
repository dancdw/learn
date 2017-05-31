import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

// 导入 RxJS 库和操作符
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroService {
private heroesUrl = 'api/heroes';  // URL to web API

  constructor (private http: Http) {}

  // 获取所有英雄，返回 Http Response 类型的可观察对象
  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // 创建一个英雄，返回 Http Response 类型的可观察对象
  create(name: string): Observable<Hero> {

    // 告诉服务器 body 中是 json 数据
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.heroesUrl, { name }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // 将响应对象映射成 json 对象
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  // 错误处理，将错误对象解析成字符串，并返回一个新的失败的可观察对象
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}