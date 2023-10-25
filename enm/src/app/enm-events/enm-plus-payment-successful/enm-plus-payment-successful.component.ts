import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../state/auth/auth.reducer';
import { take, tap } from 'rxjs';

import * as PaymentActions from '../../state/payment/payment.actions';

@Component({
  selector: 'app-enm-plus-payment-successful',
  templateUrl: './enm-plus-payment-successful.component.html',
  styleUrls: ['./enm-plus-payment-successful.component.less']
})
export class EnmPlusPaymentSuccessfulComponent {

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.plusifyUser();
  }

  plusifyUser() {
    this.store$.select(fromAuth.selectUser).pipe(
      take(1), 
      tap(user => this.store$.dispatch(PaymentActions.enmPlusMonthlySubscriptionPaymentSubmission({ user })))
    ).subscribe();
  }

}
