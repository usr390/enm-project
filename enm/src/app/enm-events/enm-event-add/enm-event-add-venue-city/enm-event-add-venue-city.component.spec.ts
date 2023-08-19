import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventAddVenueCityComponent } from './enm-event-add-venue-city.component';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmEventAddVenueCityComponent', () => {
  let component: EnmEventAddVenueCityComponent;
  let fixture: ComponentFixture<EnmEventAddVenueCityComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [EnmEventAddVenueCityComponent],
      providers: [ EnmEventAddMultipageFormService ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventAddVenueCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
