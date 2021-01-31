import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRemessasComponent } from './listar-remessas.component';

describe('ListarRemessasComponent', () => {
  let component: ListarRemessasComponent;
  let fixture: ComponentFixture<ListarRemessasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRemessasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRemessasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
