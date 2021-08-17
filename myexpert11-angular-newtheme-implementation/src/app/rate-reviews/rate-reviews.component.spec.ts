import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateReviewsComponent } from './rate-reviews.component';

describe('RateReviewsComponent', () => {
  let component: RateReviewsComponent;
  let fixture: ComponentFixture<RateReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
