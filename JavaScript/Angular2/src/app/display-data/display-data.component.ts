import { Component, OnInit } from '@angular/core';
import { Hero } from '../../service/hero/hero';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
	// title: string;
	// myHero: Hero;
	// heroes: Hero[];

	title = 'Tour of Heroes';
	heroes = [
	  new Hero(1, 'Windstorm'),
	  new Hero(13, 'Bombasto'),
	  new Hero(15, 'Magneta'),
	  new Hero(20, 'Tornado')
	];
	myHero = this.heroes[0];

	constructor() {
	  	
	}
	ngOnInit() {
	}

}
