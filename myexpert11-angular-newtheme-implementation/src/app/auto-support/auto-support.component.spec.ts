import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSupportComponent } from './auto-support.component';

describe('AutoSupportComponent', () => {
  let component: AutoSupportComponent;
  let fixture: ComponentFixture<AutoSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
