import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirInstalacaoComponent } from './abrir-instalacao.component';

describe('AbrirInstalacaoComponent', () => {
  let component: AbrirInstalacaoComponent;
  let fixture: ComponentFixture<AbrirInstalacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirInstalacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirInstalacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
