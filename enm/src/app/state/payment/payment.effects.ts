import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map } from "rxjs";
import * as PaymentActions from './payment.actions';
import { EnmPlusPaymentService } from "src/app/core/services/enm-plus-payment.service";

@Injectable()
export class PaymentEffects {
    constructor(private actions$: Actions, private enmPlusPaymentService: EnmPlusPaymentService) {}

    enmPlusPaymentScreenWaitOnFurthestMonth$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonth),
            exhaustMap(
                (action) => this.enmPlusPaymentService.furthestEventDate$.pipe(
                    map(user => PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse()),
                    catchError((error) => of(PaymentActions.enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse()))
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
}