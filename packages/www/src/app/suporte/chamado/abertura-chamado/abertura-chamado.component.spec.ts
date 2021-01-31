import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AberturaChamadoComponent } from './abertura-chamado.component';

describe('AberturaChamadoComponent', () => {
  let component: AberturaChamadoComponent;
  let fixture: ComponentFixture<AberturaChamadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AberturaChamadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AberturaChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
