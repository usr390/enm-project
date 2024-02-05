import { TestBed } from '@angular/core/testing';

import { ArtistDirectoryService } from './artist-directory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArtistDirectoryService', () => {
  let service: ArtistDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArtistDirectoryService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
