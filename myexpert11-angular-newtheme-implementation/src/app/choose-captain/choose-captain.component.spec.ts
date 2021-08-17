import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCaptainComponent } from './choose-captain.component';

describe('ChooseCaptainComponent', () => {
  let component: ChooseCaptainComponent;
  let fixture: ComponentFixture<ChooseCaptainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCaptainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
