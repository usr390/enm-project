import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogInService } from './login.service';

describe('LogInService', () => {
  let service: LogInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LogInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
