import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteActionSheetComponent } from './cliente-action-sheet.component';

describe('ClienteActionSheetComponent', () => {
  let component: ClienteActionSheetComponent;
  let fixture: ComponentFixture<ClienteActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
