import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarRemessaComponent } from './gerar-remessa.component';

describe('GerarRemessaComponent', () => {
  let component: GerarRemessaComponent;
  let fixture: ComponentFixture<GerarRemessaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerarRemessaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarRemessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
