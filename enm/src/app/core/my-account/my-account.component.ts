import { Component } from '@angular/core';
import * as AuthSelectors from './../../state/auth/auth.selectors'
import * as RarelygroovyPlusSelectors from './../../state/rarelygroovyPlus/rarelygroovyPlus.selectors'
import * as RarelygroovyPlusActions from './../../state/rarelygroovyPlus/rarelygroovyPlus.actions'
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import * as AuthActions from './../../state/auth/auth.actions';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent {

  nextInvoice$ = this.store$.select(RarelygroovyPlusSelectors.selectNextRarelygroovySubscriptionInvoice)
  isUpcomingSubscriptionRenewalDateLoading$ = this.store$.select(RarelygroovyPlusSelectors.isUpcomingSubscriptionRenewalDateLoading)
  isSubscriptionCanceling$ = this.store$.select(RarelygroovyPlusSelectors.isSubscriptionCanceling);
  subscriptionStatus$ = this.store$.select(RarelygroovyPlusSelectors.subscriptionStatus);
  subscriptionCancellationDate$ = this.store$.select(RarelygroovyPlusSelectors.subscriptionCancellationDate);
  invoiceHistory$ = this.store$.select(RarelygroovyPlusSelectors.selectInvoiceHistory);
  chargesHistory$ = this.store$.select(RarelygroovyPlusSelectors.selectChargesHistory);


  currentUser$ = this.store$.select(AuthSelectors.selectUser)

  founderAccounts = ['tigersblood', 'ewa', 'honestbooking', 'outinthe956', 'transcendent', 'FrankTheFreak', 'merwin', 'cd', 'sunday']

  constructor(
    private store$: Store<AppState>,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user && !this.founderAccounts.includes(user.username)) {
        let userid = user._id || user.id;
        this.store$.dispatch(RarelygroovyPlusActions.myAccountGetUpcomingSubscriptionRenewalDate({ userId: userid }));
      }
    })
  }

  ngAfterViewInit() {
    this.ifThisViewInitIsBeingTriggeredBecauseTheUserUnsubscribedFromRarelygroovyPlusThenDoThis();
  }

  cancelSubscription() {
    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user) {
        let userid = user._id || user.id
        this.store$.dispatch(RarelygroovyPlusActions.myAccountCancelSubscription({ userId: userid }))
      }
    })
    
  }

  confirmCancellation() {
    this.confirmationService.confirm({
      message: 'Cancel subscription?',
      accept: () => {
        // logic to execute when user confirms
        this.cancelSubscription();
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  renewSubscription() {
    this.router.navigate(['/plus']);
  }

  onLogOut() {
    this.store$.dispatch(AuthActions.logOut());
  }

  ifThisViewInitIsBeingTriggeredBecauseTheUserUnsubscribedFromRarelygroovyPlusThenDoThis() {
    if (localStorage.getItem('cancelledSubscription') === 'true') {
      this.messageService.add({ 
          key: 'unsubscribedFromRarelygroovyPlus', 
          severity: 'success', 
          summary: 'Success!', 
          detail: 'Unsubscribed From Rarelygroovy+'
      });
      console.log('hihi')
      localStorage.removeItem('cancelledSubscription');
    }
  }

}
