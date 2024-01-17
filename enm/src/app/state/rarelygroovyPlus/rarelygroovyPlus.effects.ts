import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, take } from "rxjs";
import * as RarelygroovyPlusActions from './rarelygroovyPlus.actions';
import { UserService } from "src/app/core/services/user.service";
import { UpcomingSubscriptionRenewalDateErrorResponse } from "src/app/models/upcomingSubscriptionRenewalDateErrorResponse";
import { CancelRarelygroovyPlusSubscriptionErrorResponse } from "src/app/models/cancelRarelygroovyPlusSubscriptionErrorResponse";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import * as AuthSelectors from './../auth/auth.selectors'

@Injectable()
export class RarelygroovyPlusEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService,
        private store$: Store<AppState>
    ) {}

    currentUser$ = this.store$.select(AuthSelectors.selectUser)

    myAccountGetUpcomingSubscriptionRenewalDate$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RarelygroovyPlusActions.myAccountGetUpcomingSubscriptionRenewalDate),
            exhaustMap(
                (action) => this.userService.getNextInvoice(action.userId).pipe(
                    map(upcomingSubscriptionRenewalDateSuccessResponse => RarelygroovyPlusActions.myAccountGetUpcomingSubscriptionRenewalDateSuccessResponse({ upcomingSubscriptionRenewalDateSuccessResponse })),
                    catchError((error: UpcomingSubscriptionRenewalDateErrorResponse) => {
                        return of()
                    })
                ), 
            )
        )
    );

    myAccountCancelSubscription$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RarelygroovyPlusActions.myAccountCancelSubscription),
            exhaustMap(
                (action) => this.userService.cancelSubscription(action.userId).pipe(
                    map(cancelSubscriptionSuccessResponse => RarelygroovyPlusActions.myAccountCancelSubscriptionSuccessResponse({ cancelSubscriptionSuccessResponse })),
                    catchError((error: CancelRarelygroovyPlusSubscriptionErrorResponse) => {
                        return of()
                    })
                ), 
            )
        )
    );

    cancelSubscriptionSuccessResponse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RarelygroovyPlusActions.myAccountCancelSubscriptionSuccessResponse),
            tap(myAccountCancelSubscriptionSuccessResponse => {
                this.router.navigate(['/4Nsmn93XmkD8Zin8'], { replaceUrl: true });
                this.messageService.add({ 
                    key: 'unsubscribedFromRarelygroovyPlus', 
                    severity: 'success', 
                    summary: 'Success!', 
                    detail: 'Unsubscribed From Rarelygroovy Plus',
                    life: 7000,
                });
                window.location.reload();
            })
        ),
        { dispatch: false }
    );

}