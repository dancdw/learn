import { Component, OnInit } from '@angular/core';
import { Hero } from '../../service/hero/hero';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onclick(e) { console.log(e) }
  newHero() {this.model = new Hero(42, '', '');}
  onSubmit() { this.submitted = true; }

  // 对象转换成 json 字符串
  get diagnostic() { return JSON.stringify(this.model); }

  constructor() { }

  ngOnInit() {
  }

}
