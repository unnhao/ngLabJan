import { TestBed } from '@angular/core/testing';

import { ReferrerService } from './referrer.service';

describe('ReferrerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferrerService = TestBed.get(ReferrerService);
    expect(service).toBeTruthy();
  });
});
