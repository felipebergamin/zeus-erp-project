import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoAcessoActionSheetComponent } from './ponto-acesso-action-sheet.component';

describe('PontoAcessoActionSheetComponent', () => {
  let component: PontoAcessoActionSheetComponent;
  let fixture: ComponentFixture<PontoAcessoActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontoAcessoActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoAcessoActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
