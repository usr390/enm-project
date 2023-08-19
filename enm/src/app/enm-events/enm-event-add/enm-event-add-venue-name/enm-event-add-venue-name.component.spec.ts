import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventAddVenueNameComponent } from './enm-event-add-venue-name.component';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmEventAddVenueComponent', () => {
  let component: EnmEventAddVenueNameComponent;
  let fixture: ComponentFixture<EnmEventAddVenueNameComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventAddVenueNameComponent ],
      providers: [ EnmEventAddMultipageFormService ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventAddVenueNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
