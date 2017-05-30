import { Component,Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { HeroService } from '../../service/animation/hero.service';

@Component({
  selector: 'app-hero-list-basic',
  templateUrl: './hero-list-basic.component.html',
  styleUrls: ['./hero-list-basic.component.css'],
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
export class HeroListBasicComponent implements OnInit {
  @Input() heroes: HeroService;
  constructor() { }

  ngOnInit() {
  }

}
