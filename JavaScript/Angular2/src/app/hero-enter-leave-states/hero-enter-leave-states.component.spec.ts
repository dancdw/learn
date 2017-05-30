import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEnterLeaveStatesComponent } from './hero-enter-leave-states.component';

describe('HeroEnterLeaveStatesComponent', () => {
  let component: HeroEnterLeaveStatesComponent;
  let fixture: ComponentFixture<HeroEnterLeaveStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroEnterLeaveStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroEnterLeaveStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
