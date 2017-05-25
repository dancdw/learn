import { InMemoryDbService } from 'angular-in-memory-web-api';

// 内存数据库
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: '超人'},
      {id: 12, name: '绿巨人'},
      {id: 13, name: '石头人'},
      {id: 14, name: '蜘蛛侠'},
      {id: 15, name: '绿箭'},
      {id: 16, name: '奇异博士'},
      {id: 17, name: '美国队长'},
      {id: 18, name: '蝙蝠侠'},
      {id: 19, name: '钢铁侠'},
      {id: 20, name: '闪电侠'}
    ];
    return {heroes};
  }
}