import { TestBed } from '@angular/core/testing';

import { SnackbarAdviceService } from './snackbar-advice.service';

describe('SnackbarAdviceService', () => {
  let service: SnackbarAdviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarAdviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
