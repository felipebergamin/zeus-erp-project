import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarBoletoComponent } from './lancar-boleto.component';

describe('LancarBoletoComponent', () => {
  let component: LancarBoletoComponent;
  let fixture: ComponentFixture<LancarBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancarBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
