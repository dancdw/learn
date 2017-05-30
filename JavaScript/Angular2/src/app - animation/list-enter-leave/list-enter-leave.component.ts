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
  selector: 'app-list-enter-leave',
  templateUrl: './list-enter-leave.component.html',
  styleUrls: ['./list-enter-leave.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ListEnterLeaveComponent implements OnInit {
  @Input() heroes: HeroService;
  constructor() { }

  ngOnInit() {
  }

}
