import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPoolIpComponent } from './form-pool-ip.component';

describe('FormPoolIpComponent', () => {
  let component: FormPoolIpComponent;
  let fixture: ComponentFixture<FormPoolIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPoolIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPoolIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
