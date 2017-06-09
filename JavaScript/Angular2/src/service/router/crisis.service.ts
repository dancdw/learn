import { Injectable } from '@angular/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}

const CRISES = [
  new Crisis(1, '北京大学深圳医院'),
  new Crisis(2, '深圳市第二人民医院'),
  new Crisis(3, '深圳市罗湖区人民医院'),
  new Crisis(4, '深圳市人民医院龙华分院'),
];

let crisesPromise = Promise.resolve(CRISES);

@Injectable()
export class CrisisService {

  static nextCrisisId = 100;

  getCrises() { return crisesPromise; }

  getCrisis(id: number | string) {
    return crisesPromise
      .then(crises => crises.find(crisis => crisis.id === +id));
  }
  
}
