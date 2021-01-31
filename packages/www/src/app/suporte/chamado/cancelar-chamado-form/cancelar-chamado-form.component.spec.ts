import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarChamadoFormComponent } from './cancelar-chamado-form.component';

describe('CancelarChamadoFormComponent', () => {
  let component: CancelarChamadoFormComponent;
  let fixture: ComponentFixture<CancelarChamadoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarChamadoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarChamadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
