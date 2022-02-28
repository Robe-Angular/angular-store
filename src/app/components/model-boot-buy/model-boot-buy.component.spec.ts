import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBootBuyComponent } from './model-boot-buy.component';

describe('ModelBootBuyComponent', () => {
  let component: ModelBootBuyComponent;
  let fixture: ComponentFixture<ModelBootBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelBootBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBootBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
