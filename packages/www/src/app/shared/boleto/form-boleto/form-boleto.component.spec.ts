import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBoletoComponent } from './form-boleto.component';

describe('FormBoletoComponent', () => {
  let component: FormBoletoComponent;
  let fixture: ComponentFixture<FormBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
