import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventVenueComponent } from './enm-event-venue.component';
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service'; 

describe('EnmEventAddressComponent', () => {
  let component: EnmEventVenueComponent;
  let fixture: ComponentFixture<EnmEventVenueComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventVenueComponent ],
      providers: [ EnmEventAddMultipageFormService ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
