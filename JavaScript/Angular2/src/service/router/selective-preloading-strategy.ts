import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {

      // 将路径添加到预加载的模块数组
      this.preloadedModules.push(route.path);

      // 将路由路径记录到控制台
      console.log('Preloaded: ' + route.path);

      return load();
    } else {
      return Observable.of(null);
    }
  }
}