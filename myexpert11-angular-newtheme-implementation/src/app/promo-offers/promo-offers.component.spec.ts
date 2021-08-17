import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoOffersComponent } from './promo-offers.component';

describe('PromoOffersComponent', () => {
  let component: PromoOffersComponent;
  let fixture: ComponentFixture<PromoOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
