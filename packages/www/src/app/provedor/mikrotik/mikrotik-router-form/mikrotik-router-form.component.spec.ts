import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikrotikRouterFormComponent } from './mikrotik-router-form.component';

describe('MikrotikRouterFormComponent', () => {
  let component: MikrotikRouterFormComponent;
  let fixture: ComponentFixture<MikrotikRouterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikrotikRouterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikrotikRouterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
