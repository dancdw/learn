import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Hero } from '../../service/hero/hero';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class AnimationComponent implements OnInit {
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
