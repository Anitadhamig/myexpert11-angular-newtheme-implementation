import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedContestComponent } from './joined-contest.component';

describe('JoinedContestComponent', () => {
  let component: JoinedContestComponent;
  let fixture: ComponentFixture<JoinedContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
