import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelBootComponent } from './create-model-boot.component';

describe('CreateModelBootComponent', () => {
  let component: CreateModelBootComponent;
  let fixture: ComponentFixture<CreateModelBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModelBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModelBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
