import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventArtistsComponent } from './enm-event-artists.component';

describe('EnmEventArtistsComponent', () => {
  let component: EnmEventArtistsComponent;
  let fixture: ComponentFixture<EnmEventArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventArtistsComponent]
    });
    fixture = TestBed.createComponent(EnmEventArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
