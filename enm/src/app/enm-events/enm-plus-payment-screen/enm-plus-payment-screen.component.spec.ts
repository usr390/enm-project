import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmPlusPaymentScreenComponent } from './enm-plus-payment-screen.component';
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnmPlusPaymentScreenComponent', () => {
  let component: EnmPlusPaymentScreenComponent;
  let fixture: ComponentFixture<EnmPlusPaymentScreenComponent>;
  let mockEnmPlusPaymentService: jasmine.SpyObj<EnmPlusPaymentService>;
  const mockStripe = {
    initEmbeddedCheckout: jasmine.createSpy('initEmbeddedCheckout')
  };

  beforeEach(() => {
    mockEnmPlusPaymentService = jasmine.createSpyObj('EnmPlusPaymentService', ['']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [EnmPlusPaymentScreenComponent],
      providers: [ { provide: 'Stripe', useValue: mockStripe } ]
    });
    fixture = TestBed.createComponent(EnmPlusPaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
