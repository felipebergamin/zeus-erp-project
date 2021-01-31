import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarCarneComponent } from './lancar-carne.component';

describe('LancarCarneComponent', () => {
  let component: LancarCarneComponent;
  let fixture: ComponentFixture<LancarCarneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancarCarneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarCarneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
