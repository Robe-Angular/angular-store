import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyWordListComponent } from './key-word-list.component';

describe('KeyWordListComponent', () => {
  let component: KeyWordListComponent;
  let fixture: ComponentFixture<KeyWordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyWordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
