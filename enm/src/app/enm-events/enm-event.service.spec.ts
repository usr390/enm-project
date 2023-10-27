import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventService } from './../core/services/enm-event.service';

describe('EnmEventService', () => {
  let service: EnmEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnmEventService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
