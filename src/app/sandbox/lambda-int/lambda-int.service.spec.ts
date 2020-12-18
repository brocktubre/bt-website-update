import { TestBed } from '@angular/core/testing';

import { LambdaIntService } from './lambda-int.service';

describe('LambdaIntService', () => {
  let service: LambdaIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LambdaIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
