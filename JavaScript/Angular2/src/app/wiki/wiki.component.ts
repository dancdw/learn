import { Component, OnInit } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

import { WikipediaService } from '../../service/http/wikipedia.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  items: Observable<string[]>;

  constructor (private wikipediaService: WikipediaService) { }

  // search (term: string) {
  //   this.items = this.wikipediaService.search(term);
  // }

  // 可观察流
  private searchTermStream = new Subject<string>();

  // 将值插入可观察流中
  search(term: string) { this.searchTermStream.next(term); } 

  ngOnInit() {
    this.items = this.searchTermStream
      .debounceTime(300) // 延迟 300 毫秒
      .distinctUntilChanged() // 只匹配不同值
      .switchMap((term: string) => this.wikipediaService.search(term)); // 创建新的可观察对象，返回最近一次结果
  }

}
