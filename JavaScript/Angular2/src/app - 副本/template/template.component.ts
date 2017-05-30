import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  // dec() { this.resize(-1); }
  // inc() { this.resize(+1); }
  // resize(delta: number) {}

  // @Input()  size: number | string;
  // @Output() sizeChange = new EventEmitter<number>();
  //   this.size = Math.min(40, Math.max(8, +this.size + delta));
  //   this.sizeChange.emit(this.size);
  
  // deleteRequest = new EventEmitter<Hero>();   
  // delete() {
	 //  this.deleteRequest.emit(this.hero);
  // }


  constructor() { }

  ngOnInit() {}

  // onSave() {}

}
