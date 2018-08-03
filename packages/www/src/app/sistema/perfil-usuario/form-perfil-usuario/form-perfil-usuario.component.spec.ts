import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilUsuarioComponent } from './form-perfil-usuario.component';

describe('FormPerfilUsuarioComponent', () => {
  let component: FormPerfilUsuarioComponent;
  let fixture: ComponentFixture<FormPerfilUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPerfilUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
