import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MikrotikRoutersListComponent } from './mikrotik-routers-list.component';

describe('MikrotikRoutersListComponent', () => {
  let component: MikrotikRoutersListComponent;
  let fixture: ComponentFixture<MikrotikRoutersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MikrotikRoutersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MikrotikRoutersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
