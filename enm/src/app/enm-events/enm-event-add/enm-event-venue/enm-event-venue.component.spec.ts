import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnmEventVenueComponent } from './enm-event-venue.component';
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service'; 
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('EnmEventAddressComponent', () => {
  let component: EnmEventVenueComponent;
  let fixture: ComponentFixture<EnmEventVenueComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventVenueComponent ],
      providers: [ 
        EnmEventAddMultipageFormService,
        { provide: Store, useValue: mockStore } ] 
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
