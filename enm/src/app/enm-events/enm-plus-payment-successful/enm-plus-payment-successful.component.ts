// angular imports
import { Component } from '@angular/core';
// 3rd party imports
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
// enm imports
import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as PaymentActions from '../../state/payment/payment.actions';

@Component({
  selector: 'app-enm-plus-payment-successful',
  templateUrl: './enm-plus-payment-successful.component.html',
  styleUrls: ['./enm-plus-payment-successful.component.less']
})
export class EnmPlusPaymentSuccessfulComponent {

}
