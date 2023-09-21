import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventCoverComponent } from './enm-event-cover.component';
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmEventCoverComponent', () => {
  let component: EnmEventCoverComponent;
  let fixture: ComponentFixture<EnmEventCoverComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventCoverComponent ],
      providers: [ EnmEventAddMultipageFormService ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
