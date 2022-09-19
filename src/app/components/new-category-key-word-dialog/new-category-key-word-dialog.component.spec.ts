import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryKeyWordDialogComponent } from './new-category-key-word-dialog.component';

describe('NewCategoryKeyWordDialogComponent', () => {
  let component: NewCategoryKeyWordDialogComponent;
  let fixture: ComponentFixture<NewCategoryKeyWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoryKeyWordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoryKeyWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
