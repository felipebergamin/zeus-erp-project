import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OltActionSheetComponent } from './olt-action-sheet.component';

describe('OltActionSheetComponent', () => {
  let component: OltActionSheetComponent;
  let fixture: ComponentFixture<OltActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OltActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OltActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
