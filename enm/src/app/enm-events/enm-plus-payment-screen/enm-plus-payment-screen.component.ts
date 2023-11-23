// angular imports
import { Component } from '@angular/core';
// 3rd party imports
import { concatMap, take } from 'rxjs';
// enm imports
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';
import { environment } from 'src/environments/environment';

const STRIPE_KEY = environment.stripeKey;
declare var Stripe: any;

@Component({
  selector: 'app-enm-plus-payment-screen',
  templateUrl: './enm-plus-payment-screen.component.html',
  styleUrls: ['./enm-plus-payment-screen.component.less'],
})
export class EnmPlusPaymentScreenComponent {

  constructor(private enmPlusPaymentService: EnmPlusPaymentService) {}

  checkoutSession$ = this.enmPlusPaymentService.checkoutSession$;

  stripe: any;
  checkout: any;

  ngOnInit() {
    this.initializeStripe();
  }

  initializeStripe() {
    this.stripe = Stripe(STRIPE_KEY);
    this.checkoutSession$.pipe(take(1), concatMap(checkoutSession => {
      const clientSecret = checkoutSession.clientSecret
      return this.stripe.initEmbeddedCheckout({ clientSecret })
    })).subscribe(checkout => {
      this.checkout = checkout
      this.checkout.mount('#checkout')
    });
  }
}
