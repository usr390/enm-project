// angular imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// 3rd party imports
import { concatMap, take, tap } from 'rxjs';
// enm imports
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import * as PaymentActions from './../../state/payment/payment.actions'
import * as PaymentSelectors from './../../state/payment/payment.selectors'
import * as AuthSelectors from './../../state/auth/auth.selectors'
import { NavigationService } from 'src/app/core/payment-screen-skipped.service';

const STRIPE_KEY = environment.stripeKey;
declare var Stripe: any;

@Component({
  selector: 'app-enm-plus-payment-screen',
  templateUrl: './enm-plus-payment-screen.component.html',
  styleUrls: ['./enm-plus-payment-screen.component.less'],
})
export class EnmPlusPaymentScreenComponent {

  constructor(
    private enmPlusPaymentService: EnmPlusPaymentService,
    private router: Router,
    private store$: Store<AppState>,
    private navigationService: NavigationService
  ) {}

  // checkoutSession$ = this.enmPlusPaymentService.checkoutSession$;
  furthestEventDate$ = this.store$.select(PaymentSelectors.selectFurthestMonth);
  plusSubscriptionCardLoading$ = this.store$.select(PaymentSelectors.plusSubscriptionCardLoading);
  currentUser$ = this.store$.select(AuthSelectors.selectUser).pipe(tap(user => console.log(user?.id)));

  stripe: any;
  checkout: any;

  ngOnInit() {
    this.currentUser$.pipe(take(1)).subscribe(user => { if (user) this.initializeStripe(user.id); else {this.navigationService.page2Skipped = true;this.router.navigate(['/create-user'], { replaceUrl: true }) }});
    this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth());
  }

  ngOnDestroy() {
    this.tearDownStripe();
  }

  initializeStripe(userid: string) {
    this.stripe = Stripe(STRIPE_KEY);
    this.enmPlusPaymentService.checkoutSession$(userid).pipe(take(1), concatMap(checkoutSession => {
      const clientSecret = checkoutSession.clientSecret
      return this.stripe.initEmbeddedCheckout({ clientSecret })
    })).subscribe(checkout => {
      this.checkout = checkout
      this.checkout.mount('#checkout')
    });
  }

  tearDownStripe() {
    if (this.checkout) this.checkout.destroy()
  }

  goBack() {
    this.router.navigate(['/events'])
  }
}
