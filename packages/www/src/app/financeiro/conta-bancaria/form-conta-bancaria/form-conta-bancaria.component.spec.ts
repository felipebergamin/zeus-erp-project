import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContaBancariaComponent } from './form-conta-bancaria.component';

describe('FormContaBancariaComponent', () => {
  let component: FormContaBancariaComponent;
  let fixture: ComponentFixture<FormContaBancariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContaBancariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
