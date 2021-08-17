import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawAmountComponent } from './withdraw-amount.component';

describe('WithdrawAmountComponent', () => {
  let component: WithdrawAmountComponent;
  let fixture: ComponentFixture<WithdrawAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
