import { Component } from '@angular/core';
import * as AuthSelectors from './../../state/auth/auth.selectors'
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, take } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent {

  nextInvoice$ = this.store$.select(AuthSelectors.selectUser).pipe(
    switchMap((user) => {
      if (user && user._id) {
        return this.userService.getNextInvoice(user._id);
      } else {
        return of(null); // Return an Observable that emits null if user or user._id is not available
      }
      }),
    catchError(error => {
      // Handle or log error
      console.error(error);
      return of(null);
    })
  );

  currentUser$ = this.store$.select(AuthSelectors.selectUser)

  constructor(
    private store$: Store<AppState>,
    private userService: UserService
  ) {}

  cancelSubscription() {
    this.store$.select(AuthSelectors.selectUser).pipe(
      take(1),
      switchMap((user) => {
        if (user && user._id) {
          return this.userService.cancelSubscription(user._id);
        } else {
          return of(null); // Ensure this is always returning an Observable
        }
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Return an Observable in case of an error
      })
    ).subscribe(response => {
      // Handle the response here
      console.log(response);
    });
  }
  

}
