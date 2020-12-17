import { TestBed } from '@angular/core/testing';

import { S3IntService } from './s3-int.service';

describe('S3IntService', () => {
  let service: S3IntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3IntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
