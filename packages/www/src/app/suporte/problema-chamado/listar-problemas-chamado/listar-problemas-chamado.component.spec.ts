import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProblemasChamadoComponent } from './listar-problemas-chamado.component';

describe('ListarProblemasChamadoComponent', () => {
  let component: ListarProblemasChamadoComponent;
  let fixture: ComponentFixture<ListarProblemasChamadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProblemasChamadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProblemasChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
