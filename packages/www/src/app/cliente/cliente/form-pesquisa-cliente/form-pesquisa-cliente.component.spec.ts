import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPesquisaClienteComponent } from './form-pesquisa-cliente.component';

describe('FormPesquisaClienteComponent', () => {
  let component: FormPesquisaClienteComponent;
  let fixture: ComponentFixture<FormPesquisaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPesquisaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPesquisaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
