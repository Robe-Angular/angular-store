import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDataComponent } from './consumer-data.component';

describe('ConsumerDataComponent', () => {
  let component: ConsumerDataComponent;
  let fixture: ComponentFixture<ConsumerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
