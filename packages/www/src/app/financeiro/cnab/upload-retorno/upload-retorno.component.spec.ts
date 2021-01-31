import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRetornoComponent } from './upload-retorno.component';

describe('UploadRetornoComponent', () => {
  let component: UploadRetornoComponent;
  let fixture: ComponentFixture<UploadRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
