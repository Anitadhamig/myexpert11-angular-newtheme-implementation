import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyaccountComponent } from './varifyaccount.component';

describe('VarifyaccountComponent', () => {
  let component: VarifyaccountComponent;
  let fixture: ComponentFixture<VarifyaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarifyaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
