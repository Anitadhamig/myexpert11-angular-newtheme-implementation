import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleleaugeComponent } from './singleleauge.component';

describe('SingleleaugeComponent', () => {
  let component: SingleleaugeComponent;
  let fixture: ComponentFixture<SingleleaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleleaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleleaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
