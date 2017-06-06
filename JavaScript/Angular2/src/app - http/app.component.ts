import { Component, OnInit  } from '@angular/core';

// @Component、@Directive、@Pipe 都是@Injectable 的子类型
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// AppComponent 只处理导航（路由组件）
export class AppComponent implements OnInit {
  	constructor() {}

  	// 初始化
	ngOnInit(): void {}
}
