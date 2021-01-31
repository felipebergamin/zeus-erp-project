import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPerfisUsuarioComponent } from './listar-perfis-usuario.component';

describe('ListarPerfisUsuarioComponent', () => {
  let component: ListarPerfisUsuarioComponent;
  let fixture: ComponentFixture<ListarPerfisUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPerfisUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPerfisUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
