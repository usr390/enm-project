import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDirectoryComponent } from './artist-directory.component';
import { ArtistDirectoryService } from 'src/app/core/services/artist-directory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnmEventModule } from '../enm-events.module';

describe('ArtistDirectoryComponent', () => {
  let component: ArtistDirectoryComponent;
  let fixture: ComponentFixture<ArtistDirectoryComponent>;
  let mockArtistDirectoryService: jasmine.SpyObj<ArtistDirectoryService>;


  beforeEach(() => {
    mockArtistDirectoryService = jasmine.createSpyObj('ArtistDirectoryService', ['']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EnmEventModule],
      declarations: [ArtistDirectoryComponent],
      providers: [
        { provide: ArtistDirectoryService, useValue: mockArtistDirectoryService },
      ]
    });
    fixture = TestBed.createComponent(ArtistDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
