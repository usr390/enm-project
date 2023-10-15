import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventCoverComponent } from './enm-event-cover.component';
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('EnmEventCoverComponent', () => {
  let component: EnmEventCoverComponent;
  let fixture: ComponentFixture<EnmEventCoverComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventCoverComponent ],
      providers: [ 
        EnmEventAddMultipageFormService,
        { provide: Store, useValue: mockStore } 
      ] 
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
