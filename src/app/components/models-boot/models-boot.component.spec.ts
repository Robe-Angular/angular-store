import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsBootComponent } from './models-boot.component';

describe('ModelsBootComponent', () => {
  let component: ModelsBootComponent;
  let fixture: ComponentFixture<ModelsBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
