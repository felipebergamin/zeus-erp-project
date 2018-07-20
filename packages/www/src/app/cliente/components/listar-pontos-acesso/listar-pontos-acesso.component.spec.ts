import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPontosAcessoComponent } from './listar-pontos-acesso.component';

describe('ListarPontosAcessoComponent', () => {
  let component: ListarPontosAcessoComponent;
  let fixture: ComponentFixture<ListarPontosAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPontosAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPontosAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
