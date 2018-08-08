import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirSinalOnuComponent } from './exibir-sinal-onu.component';

describe('ExibirSinalOnuComponent', () => {
  let component: ExibirSinalOnuComponent;
  let fixture: ComponentFixture<ExibirSinalOnuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirSinalOnuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirSinalOnuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
