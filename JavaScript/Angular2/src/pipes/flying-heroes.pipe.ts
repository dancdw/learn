import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flyingHeroes',
  pure: false, // 是否纯管道，非纯递归遍历
})
export class FlyingHeroesPipe implements PipeTransform {

  transform(allHeroes: any[]) {
    if(allHeroes){
    	return allHeroes.filter(hero => hero.canFly);
    }
  }

}
