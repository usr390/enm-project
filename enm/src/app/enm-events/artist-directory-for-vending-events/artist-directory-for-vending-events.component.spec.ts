import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDirectoryForVendingEventsComponent } from './artist-directory-for-vending-events.component';

describe('ArtistDirectoryForVendingEventsComponent', () => {
  let component: ArtistDirectoryForVendingEventsComponent;
  let fixture: ComponentFixture<ArtistDirectoryForVendingEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistDirectoryForVendingEventsComponent]
    });
    fixture = TestBed.createComponent(ArtistDirectoryForVendingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
