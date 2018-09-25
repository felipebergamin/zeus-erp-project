import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPesquisaChamadosComponent } from './form-pesquisa-chamados.component';

describe('FormPesquisaChamadosComponent', () => {
  let component: FormPesquisaChamadosComponent;
  let fixture: ComponentFixture<FormPesquisaChamadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPesquisaChamadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPesquisaChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
