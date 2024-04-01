import { TestBed } from '@angular/core/testing';

import { DbadapterService } from './dbadapter.service';

describe('DbadapterService', () => {
  let service: DbadapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbadapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
