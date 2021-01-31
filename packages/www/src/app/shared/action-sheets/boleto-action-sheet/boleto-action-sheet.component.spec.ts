import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoActionSheetComponent } from './boleto-action-sheet.component';

describe('BoletoActionSheetComponent', () => {
  let component: BoletoActionSheetComponent;
  let fixture: ComponentFixture<BoletoActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
