import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesoffairplayComponent } from './rulesoffairplay.component';

describe('RulesoffairplayComponent', () => {
  let component: RulesoffairplayComponent;
  let fixture: ComponentFixture<RulesoffairplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesoffairplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesoffairplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
