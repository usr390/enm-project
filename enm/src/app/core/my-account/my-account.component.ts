import { Component } from '@angular/core';
import * as AuthSelectors from './../../state/auth/auth.selectors'
import * as RarelygroovyPlusSelectors from './../../state/rarelygroovyPlus/rarelygroovyPlus.selectors'
import * as RarelygroovyPlusActions from './../../state/rarelygroovyPlus/rarelygroovyPlus.actions'
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, take } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent {

  nextInvoice$ = this.store$.select(RarelygroovyPlusSelectors.selectNextRarelygroovySubscriptionInvoice)
  isUpcomingSubscriptionRenewalDateLoading$ = this.store$.select(RarelygroovyPlusSelectors.isUpcomingSubscriptionRenewalDateLoading)
  isSubscriptionCanceling$ = this.store$.select(RarelygroovyPlusSelectors.isSubscriptionCanceling);
  currentUser$ = this.store$.select(AuthSelectors.selectUser)

  constructor(
    private store$: Store<AppState>,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user) {
        let userid = user._id
        this.store$.dispatch(RarelygroovyPlusActions.myAccountGetUpcomingSubscriptionRenewalDate({ userId: userid }));
      }
    })
  }

  cancelSubscription() {
    // this.store$.select(AuthSelectors.selectUser).pipe(
    //   take(1),
    //   switchMap((user) => {
    //     if (user && user._id) {
    //       return this.userService.cancelSubscription(user._id);
    //     } else {
    //       return of(null); // Ensure this is always returning an Observable
    //     }
    //   }),
    //   catchError(error => {
    //     console.error(error);
    //     return of(null); // Return an Observable in case of an error
    //   })
    // ).subscribe(response => {
    //   // Handle the response here
    //   console.log(response);
    // });
    this.currentUser$.pipe(take(1)).subscribe(user => { 
      if (user) {
        let userid = user._id
        this.store$.dispatch(RarelygroovyPlusActions.myAccountCancelSubscription({ userId: userid }))
      }
    })
    
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
