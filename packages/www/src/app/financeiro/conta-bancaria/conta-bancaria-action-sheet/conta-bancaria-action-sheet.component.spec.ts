import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaBancariaActionSheetComponent } from './conta-bancaria-action-sheet.component';

describe('ContaBancariaActionSheetComponent', () => {
  let component: ContaBancariaActionSheetComponent;
  let fixture: ComponentFixture<ContaBancariaActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaBancariaActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaBancariaActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
