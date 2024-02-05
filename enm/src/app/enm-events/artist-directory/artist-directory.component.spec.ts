import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDirectoryComponent } from './artist-directory.component';

describe('ArtistDirectoryComponent', () => {
  let component: ArtistDirectoryComponent;
  let fixture: ComponentFixture<ArtistDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistDirectoryComponent]
    });
    fixture = TestBed.createComponent(ArtistDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
