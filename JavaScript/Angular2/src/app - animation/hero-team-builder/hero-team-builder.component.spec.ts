import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTeamBuilderComponent } from './hero-team-builder.component';

describe('HeroTeamBuilderComponent', () => {
  let component: HeroTeamBuilderComponent;
  let fixture: ComponentFixture<HeroTeamBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroTeamBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroTeamBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
