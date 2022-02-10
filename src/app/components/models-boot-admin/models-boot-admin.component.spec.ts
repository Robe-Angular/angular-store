import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsBootAdminComponent } from './models-boot-admin.component';

describe('ModelsBootAdminComponent', () => {
  let component: ModelsBootAdminComponent;
  let fixture: ComponentFixture<ModelsBootAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsBootAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsBootAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
