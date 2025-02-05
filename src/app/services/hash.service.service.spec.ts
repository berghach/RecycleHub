import { TestBed } from '@angular/core/testing';

import { HashServiceService } from './hash.service.service';

describe('HashServiceService', () => {
  let service: HashServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
