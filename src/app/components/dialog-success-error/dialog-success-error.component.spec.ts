import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessErrorComponent } from './dialog-success-error.component';

describe('DialogSuccessErrorComponent', () => {
  let component: DialogSuccessErrorComponent;
  let fixture: ComponentFixture<DialogSuccessErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuccessErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccessErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
