import { TestBed } from '@angular/core/testing';

import { HeaderChangeService } from './header-change.service';

describe('HeaderChangeService', () => {
  let service: HeaderChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
