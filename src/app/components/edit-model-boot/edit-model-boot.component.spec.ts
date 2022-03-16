import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelBootComponent } from './edit-model-boot.component';

describe('EditModelBootComponent', () => {
  let component: EditModelBootComponent;
  let fixture: ComponentFixture<EditModelBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModelBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
