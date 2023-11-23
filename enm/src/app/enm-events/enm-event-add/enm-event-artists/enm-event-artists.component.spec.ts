// angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// 3rd party imports
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
// enm imports
import { EnmEventArtistsComponent } from './enm-event-artists.component';
import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

describe('EnmEventArtistsComponent', () => {
  let component: EnmEventArtistsComponent;
  let fixture: ComponentFixture<EnmEventArtistsComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventArtistsComponent ],
      providers: [ 
        EnmEventAddMultipageFormService,
        { provide: Store, useValue: mockStore }
      ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
