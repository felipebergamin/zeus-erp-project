import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstalacoesComponent } from './listar-instalacoes.component';

describe('ListarInstalacoesComponent', () => {
  let component: ListarInstalacoesComponent;
  let fixture: ComponentFixture<ListarInstalacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInstalacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
