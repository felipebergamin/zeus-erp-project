import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharBoletoComponent } from './detalhar-boleto.component';

describe('DetalharBoletoComponent', () => {
  let component: DetalharBoletoComponent;
  let fixture: ComponentFixture<DetalharBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalharBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
