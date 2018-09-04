import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoActionSheetComponent } from './chamado-action-sheet.component';

describe('ChamadoActionSheetComponent', () => {
  let component: ChamadoActionSheetComponent;
  let fixture: ComponentFixture<ChamadoActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadoActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadoActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
