import { TestBed } from '@angular/core/testing';

import { NltkServiceService } from './nltk-service.service';

describe('NltkServiceService', () => {
  let service: NltkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NltkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
