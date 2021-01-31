import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBoletosComponent } from './listar-boletos.component';

describe('ListarBoletosComponent', () => {
  let component: ListarBoletosComponent;
  let fixture: ComponentFixture<ListarBoletosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBoletosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
