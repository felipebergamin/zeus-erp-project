import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosAbertosComponent } from './chamados-abertos.component';

describe('ChamadosAbertosComponent', () => {
  let component: ChamadosAbertosComponent;
  let fixture: ComponentFixture<ChamadosAbertosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosAbertosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosAbertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
