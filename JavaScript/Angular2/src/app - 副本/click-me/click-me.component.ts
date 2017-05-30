import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-click-me',
  templateUrl: './click-me.component.html',
  styleUrls: ['./click-me.component.css']
})
export class ClickMeComponent implements OnInit {
	clickMessage = '';
	value = '';
	values = '';
	heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

	// 添加英雄
	addHero(newHero: string) {
	    if (newHero) {
	      this.heroes.push(newHero);
	    }
	}

	// 点击事件
	onClickMe(e:object) {
	    	console.log(e)
	    	this.clickMessage = 'You are my hero!';
	}

	// 键盘弹起事件
	onKey(value: string) {
	    	this.values += value + ' | ';
	}

	onEnter(value: string) { this.value = value; }

	update(value: string) { this.value = value; }

  	constructor() { }

	ngOnInit() {}


}
