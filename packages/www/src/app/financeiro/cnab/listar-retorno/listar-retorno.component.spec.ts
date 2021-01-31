import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRetornoComponent } from './listar-retorno.component';

describe('ListarRetornoComponent', () => {
  let component: ListarRetornoComponent;
  let fixture: ComponentFixture<ListarRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
