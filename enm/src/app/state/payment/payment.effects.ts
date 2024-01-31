import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as PaymentActions from './payment.actions';
import { EnmPlusPaymentService } from "src/app/core/services/enm-plus-payment.service";
import { Router } from "@angular/router";

@Injectable()
export class PaymentEffects {
    constructor(private actions$: Actions, private enmPlusPaymentService: EnmPlusPaymentService, private router: Router) {}

    enmPlusPaymentScreenWaitOnFurthestMonth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth),
            exhaustMap(
                (action) => this.enmPlusPaymentService.furthestEventDate$.pipe(
                    map(enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse => PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse({ enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse })),
                    catchError((error: string) => of(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse()))
                ), 
            )
        )
    );

    enmPlusMonthlySubscriptionPaymentSubmission$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PaymentActions.enmPlusMonthlySubscriptionPaymentSubmission),
            exhaustMap(
                (action) => this.enmPlusPaymentService.plusifyUser(action.user).pipe(
                    map(user => PaymentActions.enmPlusMonthlySubscriptionPaymentSuccessReponse({ user })),
                    catchError((error) => of(PaymentActions.enmPlusMonthlySubscriptionPaymentErrorResponse()))
                ), 
            )
        )
    );

    enmPlusPaymentScreenWaitOnStripeCheckoutResponse$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PaymentActions.enmPlusPaymentScreenWaitOnStripeCheckoutResponse),
            exhaustMap(
                (action) => this.enmPlusPaymentService.checkoutSessionToAppeaseEffect(action.userId).pipe(
                    map(enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse => PaymentActions.enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse({ enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse })),
                    catchError((error: string) => of(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse()))
                ), 
            )
        )
    );

    enmPlusMonthlyScreenWaitOnStripeCheckoutSuccessReponse$ = createEffect(() => 
    this.actions$.pipe(
        ofType(PaymentActions.enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse),
        tap(() => {
            setTimeout(() => {
                const scrollHeight = document.body.scrollHeight;
                const scrollTo = scrollHeight * 0.5;
                window.scrollTo(0, scrollTo);
            }, 2000); // Delay of 5 seconds
        })
    ), { dispatch: false }
);


}