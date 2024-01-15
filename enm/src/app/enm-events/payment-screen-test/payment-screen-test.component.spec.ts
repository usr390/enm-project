import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScreenTestComponent } from './payment-screen-test.component';

describe('PaymentScreenTestComponent', () => {
  let component: PaymentScreenTestComponent;
  let fixture: ComponentFixture<PaymentScreenTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentScreenTestComponent]
    });
    fixture = TestBed.createComponent(PaymentScreenTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
