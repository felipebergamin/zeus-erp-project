import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPoolsIpComponent } from './listar-pools-ip.component';

describe('ListarPoolsIpComponent', () => {
  let component: ListarPoolsIpComponent;
  let fixture: ComponentFixture<ListarPoolsIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPoolsIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPoolsIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
