import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPontoAcessoComponent } from './form-ponto-acesso.component';

describe('FormPontoAcessoComponent', () => {
  let component: FormPontoAcessoComponent;
  let fixture: ComponentFixture<FormPontoAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPontoAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPontoAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
