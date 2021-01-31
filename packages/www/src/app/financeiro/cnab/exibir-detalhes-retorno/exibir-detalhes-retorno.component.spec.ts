import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirDetalhesRetornoComponent } from './exibir-detalhes-retorno.component';

describe('ExibirDetalhesRetornoComponent', () => {
  let component: ExibirDetalhesRetornoComponent;
  let fixture: ComponentFixture<ExibirDetalhesRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirDetalhesRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirDetalhesRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
