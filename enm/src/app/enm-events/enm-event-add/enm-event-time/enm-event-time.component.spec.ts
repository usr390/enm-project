// angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// 3rd party
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
// enm
import { EnmEventTimeComponent } from './enm-event-time.component';
import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';


describe('EnmEventTimeComponent', () => {
  let component: EnmEventTimeComponent;
  let fixture: ComponentFixture<EnmEventTimeComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      declarations: [ EnmEventTimeComponent ],
      providers: [ 
        EnmEventAddMultipageFormService,
        { provide: Store, useValue: mockStore } 
      ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
