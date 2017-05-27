import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  // deleteRequest = new EventEmitter<Hero>();
  // @Input()  size: number | string;
  // @Output() sizeChange = new EventEmitter<number>();
  
  // dec() { this.resize(-1); }
  // inc() { this.resize(+1); }
  // resize(delta: number) {

  //   this.size = Math.min(40, Math.max(8, +this.size + delta));
  //   this.sizeChange.emit(this.size);
    
  // }
  // delete() {
	 //  this.deleteRequest.emit(this.hero);
  // }


  constructor() { }

  ngOnInit() {}

  // onSave() {}

}
