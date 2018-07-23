import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOltComponent } from './form-olt.component';

describe('FormOltComponent', () => {
  let component: FormOltComponent;
  let fixture: ComponentFixture<FormOltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
