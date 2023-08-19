import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventAddVenueAddressComponent } from './enm-event-add-venue-address.component';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmEventAddVenueAddressComponent', () => {
  let component: EnmEventAddVenueAddressComponent;
  let fixture: ComponentFixture<EnmEventAddVenueAddressComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [EnmEventAddVenueAddressComponent],
      providers: [ EnmEventAddMultipageFormService ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventAddVenueAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
