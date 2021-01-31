import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContasBancariasComponent } from './listar-contas-bancarias.component';

describe('ListarContasBancariasComponent', () => {
  let component: ListarContasBancariasComponent;
  let fixture: ComponentFixture<ListarContasBancariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContasBancariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContasBancariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
