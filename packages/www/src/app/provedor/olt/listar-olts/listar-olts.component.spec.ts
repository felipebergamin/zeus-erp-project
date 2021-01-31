import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOltsComponent } from './listar-olts.component';

describe('ListarOltsComponent', () => {
  let component: ListarOltsComponent;
  let fixture: ComponentFixture<ListarOltsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOltsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
