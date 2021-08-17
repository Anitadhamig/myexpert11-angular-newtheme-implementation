import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairplayComponent } from './fairplay.component';

describe('FairplayComponent', () => {
  let component: FairplayComponent;
  let fixture: ComponentFixture<FairplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
