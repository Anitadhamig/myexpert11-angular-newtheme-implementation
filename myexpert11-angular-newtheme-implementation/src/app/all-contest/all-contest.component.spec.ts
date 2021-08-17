import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContestComponent } from './all-contest.component';

describe('AllContestComponent', () => {
  let component: AllContestComponent;
  let fixture: ComponentFixture<AllContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
