import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as RarelygroovyPlusActions from './rarelygroovyPlus.actions';
import { UserService } from "src/app/core/services/user.service";
import { UpcomingSubscriptionRenewalDateErrorResponse } from "src/app/models/upcomingSubscriptionRenewalDateErrorResponse";

@Injectable()
export class RarelygroovyPlusEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    myAccountGetUpcomingSubscriptionRenewalDate$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RarelygroovyPlusActions.myAccountGetUpcomingSubscriptionRenewalDate),
            tap(() => console.log('hi from the effect!@')),
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

}