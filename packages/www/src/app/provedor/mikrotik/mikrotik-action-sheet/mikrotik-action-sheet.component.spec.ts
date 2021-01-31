import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikrotikActionSheetComponent } from './mikrotik-action-sheet.component';

describe('MikrotikActionSheetComponent', () => {
  let component: MikrotikActionSheetComponent;
  let fixture: ComponentFixture<MikrotikActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikrotikActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikrotikActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
