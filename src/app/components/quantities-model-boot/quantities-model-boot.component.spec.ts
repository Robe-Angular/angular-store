import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitiesModelBootComponent } from './quantities-model-boot.component';

describe('QuantitiesModelBootComponent', () => {
  let component: QuantitiesModelBootComponent;
  let fixture: ComponentFixture<QuantitiesModelBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitiesModelBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitiesModelBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
