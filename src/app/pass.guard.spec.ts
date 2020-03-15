import { TestBed } from '@angular/core/testing';

import { PassGuard } from './pass.guard';

describe('PassGuard', () => {
  let guard: PassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
