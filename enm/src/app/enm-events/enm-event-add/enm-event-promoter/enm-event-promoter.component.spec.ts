import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmEventPromoterComponent } from './enm-event-promoter.component';
import { of } from 'rxjs';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmEventPromoterComponent', () => {
  let component: EnmEventPromoterComponent;
  let fixture: ComponentFixture<EnmEventPromoterComponent>;
  let mockEnmEventAddMultipageFormService: jasmine.SpyObj<EnmEventAddMultipageFormService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };

  beforeEach(() => {
    mockEnmEventAddMultipageFormService = jasmine.createSpyObj('EnmEventAddMultipageFormService', ['']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EnmEventPromoterComponent],
      providers: [ 
        EnmEventAddMultipageFormService,
        { provide: Store, useValue: mockStore }
      ] 
    });
    fixture = TestBed.createComponent(EnmEventPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnmEventPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
