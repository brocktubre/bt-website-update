import { TestBed } from '@angular/core/testing';

import { DynamodbIntService } from './dynamodb-int.service';

describe('DynamodbIntService', () => {
  let service: DynamodbIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamodbIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
