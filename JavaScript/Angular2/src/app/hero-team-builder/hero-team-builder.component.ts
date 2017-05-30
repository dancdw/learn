import { Component, OnInit } from '@angular/core';

import { HeroService } from '../../service/animation/hero.service';

@Component({
  selector: 'app-hero-team-builder',
  templateUrl: './hero-team-builder.component.html',
  styleUrls: ['./hero-team-builder.component.css']
})
export class HeroTeamBuilderComponent implements OnInit {

  constructor(private heroes: HeroService) { }

  ngOnInit() {
  }

}
