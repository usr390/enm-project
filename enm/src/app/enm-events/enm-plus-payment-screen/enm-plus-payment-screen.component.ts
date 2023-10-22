import { Component } from '@angular/core';
import { concatMap, take } from 'rxjs';
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

  checkoutSession$ = this.enmPlusPaymentService.checkoutSession$;

  stripe: any;
  checkout: any;

  constructor(private enmPlusPaymentService: EnmPlusPaymentService) {}

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
