import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitiesModelsBootComponent } from './quantities-models-boot.component';

describe('QuantitiesModelsBootComponent', () => {
  let component: QuantitiesModelsBootComponent;
  let fixture: ComponentFixture<QuantitiesModelsBootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitiesModelsBootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitiesModelsBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
