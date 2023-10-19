import { TestBed } from '@angular/core/testing';

import { EnmPlusPaymentService } from './enm-plus-payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmPlusPaymentService', () => {
  let service: EnmPlusPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EnmPlusPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
