// angular imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// 3rd party imports
import { concatMap, take } from 'rxjs';
// enm imports
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';
import { AppState } from 'src/app/state/app.state';
import { environment } from 'src/environments/environment';
import * as PaymentActions from './../../state/payment/payment.actions'
import * as PaymentSelectors from './../../state/payment/payment.selectors'
import * as AuthSelectors from './../../state/auth/auth.selectors'
import { PaymentScreenSkippedService } from 'src/app/core/payment-screen-skipped.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/core/services/product-service.service';

const STRIPE_KEY = environment.stripeKey;
declare var Stripe: any;

@Component({
  selector: 'app-enm-plus-payment-screen',
  templateUrl: './enm-plus-payment-screen.component.html',
  styleUrls: ['./enm-plus-payment-screen.component.less'],
})
export class EnmPlusPaymentScreenComponent {

  products: Product[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private enmPlusPaymentService: EnmPlusPaymentService,
    private router: Router,
    private store$: Store<AppState>,
    private navigationService: PaymentScreenSkippedService,
    private productService: ProductService
  ) {}

  // checkoutSession$ = this.enmPlusPaymentService.checkoutSession$;
  furthestEventDate$ = this.store$.select(PaymentSelectors.selectFurthestMonth);
  furthestEventDate = ''
  defunctArtistsCount$ = this.store$.select(PaymentSelectors.selectDefunctArtistsCount);
  defunctArtistCount = '';

  plusSubscriptionCardLoading$ = this.store$.select(PaymentSelectors.plusSubscriptionCardLoading);
  currentUser$ = this.store$.select(AuthSelectors.selectUser);

  stripe: any;
  checkout: any;

  ngOnInit() {
    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user) {
        this.initializeStripe(user.id);
        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth());
        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnDefunctArtistsCount());
      } 
      else {
        this.navigationService.paymentScreenSkipped = true;
        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth());
        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnDefunctArtistsCount());
      }}
    );

    this.defunctArtistsCount$.pipe(take(1)).subscribe(defunctArtistCount => {
      this.defunctArtistCount = defunctArtistCount
    })

    this.furthestEventDate$.pipe(take(1)).subscribe(furthestEventDate => {
      this.furthestEventDate = furthestEventDate;
    })

    const date = new Date(this.furthestEventDate);

    // Get the month name
    const month = date.toLocaleString('default', { month: 'long' });

    this.products = [
      {
        name: 'Our Full Event List',
        description: `Currently extending through November!`,
        image: 'fulllist2.gif',
      },
      {
          name: 'Event Filters',
          description: 'Filter events by artist, venue, promoter, and a bunch more',
          image: 'filter.gif',
      },
      {
          name: 'Our Full Artist Directory',
          description: `See defunct artists from previous eras of the valley music scene. We currently have 162 catalogued, but this number is always growing`,
          image: 'ad.gif',
      }
    ];

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];

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

  navigateToLogInPage() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
