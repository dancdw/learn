import { Component, OnInit, EventEmitter, Output  } from '@angular/core';


@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})
export class HeroAddComponent implements OnInit {

  @Output() addHero = new EventEmitter<any>();
  canFly = true;

  constructor() { this.reset(); }

  newHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.addHero.emit( {name, canFly: this.canFly} );
  }

  reset() {  }

  ngOnInit() {
  }

}
