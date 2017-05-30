import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnterLeaveComponent } from './list-enter-leave.component';

describe('ListEnterLeaveComponent', () => {
  let component: ListEnterLeaveComponent;
  let fixture: ComponentFixture<ListEnterLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnterLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnterLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
