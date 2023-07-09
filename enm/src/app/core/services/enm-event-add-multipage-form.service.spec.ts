import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventAddMultipageFormService } from './enm-event-add-multipage-form.service';

describe('EnmEventAddMultipageFormService', () => {
  let service: EnmEventAddMultipageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnmEventAddMultipageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
