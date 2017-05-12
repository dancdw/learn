import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// AppComponent 只处理导航（理由组件）
export class AppComponent implements OnInit {
  	title = 'Tour of Heroes';
  	constructor() {}

  	// 初始化
	ngOnInit(): void {
  	}
}
