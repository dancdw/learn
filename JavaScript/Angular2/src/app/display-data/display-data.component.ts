import { Component, OnInit } from '@angular/core';
import { Hero } from '../../service/hero/hero';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
	title: string;
	myHero: Hero;
	heroes: Hero[];
	
	constructor() {
		
	}

	ngOnInit() {
		this.title = 'Tour of Heroes';
		this.heroes	= [
		  new Hero(1, 'Windstorm', 'power'),
		  new Hero(13, 'Bombasto', 'power'),
		  new Hero(15, 'Magneta', 'power'),
		  new Hero(20, 'Tornado', 'power'),
		]
		this.myHero = this.heroes[0];
	}
}
