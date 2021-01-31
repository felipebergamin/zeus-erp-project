import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPesquisaPaComponent } from './form-pesquisa-pa.component';

describe('FormPesquisaPaComponent', () => {
  let component: FormPesquisaPaComponent;
  let fixture: ComponentFixture<FormPesquisaPaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPesquisaPaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPesquisaPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
