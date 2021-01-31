import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanoComponent } from './form-plano.component';

describe('FormPlanoComponent', () => {
  let component: FormPlanoComponent;
  let fixture: ComponentFixture<FormPlanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
