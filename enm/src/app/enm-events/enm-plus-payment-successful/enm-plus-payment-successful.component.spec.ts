import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmPlusPaymentSuccessfulComponent } from './enm-plus-payment-successful.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';

describe('EnmPlusPaymentSuccessfulComponent', () => {
  let component: EnmPlusPaymentSuccessfulComponent;
  let fixture: ComponentFixture<EnmPlusPaymentSuccessfulComponent>;
  let mockEnmPlusPaymentService: jasmine.SpyObj<EnmPlusPaymentService>;
  const mockStore = { select: jasmine.createSpy().and.returnValue(of(null)), };


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmPlusPaymentSuccessfulComponent],
      providers: [ 
        { provide: Store, useValue: mockStore },
        { provide: EnmPlusPaymentService, useValue: mockEnmPlusPaymentService },
         ] 
    }).compileComponents();
    fixture = TestBed.createComponent(EnmPlusPaymentSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
