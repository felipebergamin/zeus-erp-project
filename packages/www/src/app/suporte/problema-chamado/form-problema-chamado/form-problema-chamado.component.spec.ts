import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProblemaChamadoComponent } from './form-problema-chamado.component';

describe('FormProblemaChamadoComponent', () => {
  let component: FormProblemaChamadoComponent;
  let fixture: ComponentFixture<FormProblemaChamadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProblemaChamadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProblemaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
