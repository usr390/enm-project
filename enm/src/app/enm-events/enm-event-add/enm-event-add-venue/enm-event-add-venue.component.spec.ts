import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventAddVenueComponent } from './enm-event-add-venue.component';

describe('EnmEventAddVenueComponent', () => {
  let component: EnmEventAddVenueComponent;
  let fixture: ComponentFixture<EnmEventAddVenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmEventAddVenueComponent]
    });
    fixture = TestBed.createComponent(EnmEventAddVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
