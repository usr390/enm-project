import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnmPlusPaymentSuccessfulComponent } from './enm-plus-payment-successful.component';

describe('EnmPlusPaymentSuccessfulComponent', () => {
  let component: EnmPlusPaymentSuccessfulComponent;
  let fixture: ComponentFixture<EnmPlusPaymentSuccessfulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmPlusPaymentSuccessfulComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EnmPlusPaymentSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
