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
import { PaymentScreenSkippedService } from 'src/app/core/payment-screen-skipped.service';
import { CarouselStuff, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/core/services/product-service.service';

const STRIPE_KEY = environment.stripeKeyTest;
declare var Stripe: any;

@Component({
  selector: 'app-payment-screen-test',
  templateUrl: './payment-screen-test.component.html',
  styleUrls: ['./payment-screen-test.component.less']
})
export class PaymentScreenTestComponent {

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
  plusSubscriptionCardLoading$ = this.store$.select(PaymentSelectors.plusSubscriptionCardLoading);
  currentUser$ = this.store$.select(AuthSelectors.selectUser);

  stripe: any;
  checkout: any;

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];

    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user) {
        this.initializeStripe(user.id);
        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth());
      } 
      else {
        this.navigationService.paymentScreenSkipped = true;
      }});
  }

  ngOnDestroy() {
    this.tearDownStripe();
  }

  initializeStripe(userid: string) {
    this.stripe = Stripe(STRIPE_KEY);
    this.enmPlusPaymentService.checkoutSessionTest$(userid).pipe(take(1), concatMap(checkoutSession => {
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

  navigateToLogInPage(){
    this.router.navigate(['/login']);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success'
    }
  }
}
