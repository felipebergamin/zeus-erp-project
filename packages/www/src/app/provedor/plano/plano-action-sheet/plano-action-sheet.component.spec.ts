import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoActionSheetComponent } from './plano-action-sheet.component';

describe('PlanoActionSheetComponent', () => {
  let component: PlanoActionSheetComponent;
  let fixture: ComponentFixture<PlanoActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
