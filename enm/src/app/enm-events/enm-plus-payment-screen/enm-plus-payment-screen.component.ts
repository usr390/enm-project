// angular imports
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('checkOutScrollTo', { static: false }) checkoutSection!: ElementRef;

  products: Product[] = [];

  premiumFeatures = [
    {
      title: 'Narrow down your search for events',
      description: 'Use filters to find events based on specific artists, venues, dates, and more.',
      image: './../../../assets/images/test.png',
    },
    {
      title: 'Plan Which Events You’ll Attend',
      description: 'Get a glimpse of upcoming events and plan your schedule well in advance.',
      image: './../../../assets/images/test3.png',
    },
    {
      title: 'Revel in the valley’s music history',
      description: 'The complete artist directory includes bands that are no longer active—whether due to disbandment, hiatus, or simply fading into history.',
      image: './../../../assets/images/test2.png',
    },
  ];

  planFeatures = [
    {
        name: 'Events - complete event list',
        info: null,
        basic: false,
        premium: true
    },
    {
        name: 'Events - event filters',
        info: null,
        basic: false,
        premium: true
    },
    {
        name: 'Artist Directory - active artists',
        info: null, // no tooltip for this feature
        basic: true,
        premium: true
    },
    {
        name: 'Artist Directory - defunct artists',
        info: null,
        basic: false,
        premium: true
    },
    {
      name: 'Artist Directory - touring artists',
      info: null,
      basic: false,
      premium: true
    },
    {
      name: 'Artist Directory - filter by genre',
      info: null,
      basic: true,
      premium: true
    },
    {
        name: 'Blog',
        info: null,
        basic: true,
        premium: true
    }
  ];

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
        description: `Currently extending through March!`,
        image: 'fulllist2.gif',
      },
      {
          name: 'Event Filters',
          description: 'Filter events by artist, venue, promoter, and a bunch more',
          image: 'filter.gif',
      },
      {
          name: 'Our Full Artist Directory',
          description: `See defunct artists from previous eras of the valley music scene. We currently have 168 catalogued, but this number is always growing`,
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

  handleButtonClick() {
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      console.log('Current User:', user);
      if (user) {
        const elementPosition = this.checkoutSection.nativeElement.getBoundingClientRect().top + window.scrollY;
        const offset = 50; // Adjust this value to add space above
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      } else {
        // User is not signed in, navigate to login
        this.navigateToLogInPage();
      }
    });
  }

  scrollToCheckout() {
    this.checkoutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToLogInPage() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
