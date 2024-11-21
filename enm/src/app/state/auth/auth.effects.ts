import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LogInService } from "src/app/core/services/login.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, concatMap, Observable, take } from "rxjs";
import * as AuthActions from './auth.actions';
import * as EnmEventActions from './../enmEvents/enmEvents.actions'
import { CreateUserService } from "src/app/core/services/create-user.service";
import { MessageService } from "primeng/api";
import { LogInErrorResponse } from "src/app/models/logInErrorResponse.model";
import { UserService } from "src/app/core/services/user.service";
import { RefreshUserErrorResponse } from "src/app/models/refreshUserErrorResponse";
import { PaymentScreenSkippedService } from "src/app/core/payment-screen-skipped.service";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import * as PaymentActions from './../../state/payment/payment.actions'
import * as AuthSelectors from './../../state/auth/auth.selectors';



@Injectable()
export class AuthEffects {

    getRandomWelcomeMessage() {
        const welcomeMessages = [
            "Hey there! Account created",
            "Hey! Your account's been set up",
            "Your account's set up. Rock on",
            "Hey! Account registration successful",
            "All set! Account created.",
            "Howdy! Account registration successful",
        ];
    
        const randomMessage = Math.floor(Math.random() * welcomeMessages.length);
        return welcomeMessages[randomMessage];
    }

    currentUser$ = this.store$.select(AuthSelectors.selectUser)


    constructor(
        private actions$: Actions,
        private logInService: LogInService,
        private userService: UserService,
        private createUserService: CreateUserService,
        private router: Router,
        private messageService: MessageService,
        private paymentScreenSkippedService: PaymentScreenSkippedService,
        private store$: Store<AppState>
    ) {}

    logInRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logInRequest),
            exhaustMap(
                (action) => this.logInService.logIn(action.credentials.username, action.credentials.password).pipe(
                    map(logInSuccessResponse => AuthActions.logInSuccessResponse({ logInSuccessResponse })),
                    catchError((error: LogInErrorResponse) => {
                        this.messageService.add({ key: 'logInError', severity: 'error', summary: error?.error.error, detail: 'Try again' })
                        return of(AuthActions.logInErrorResponse({ error }))
                    })
                ), 
            )
        )
    );

    logInSuccess$ = createEffect(() => 
        this.actions$.pipe(
        ofType(AuthActions.logInSuccessResponse),
        concatMap(logInSuccessResponse => {
            if (this.paymentScreenSkippedService.paymentScreenSkipped && !logInSuccessResponse.logInSuccessResponse.user?.plus) {
                this.paymentScreenSkippedService.paymentScreenSkipped = false;
                this.currentUser$.pipe(take(1)).subscribe(user => {
                    if (user) {
                        let userid = user._id || user.id;
                        this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnStripeCheckoutResponse({ userId: userid }));
                    }
                  })
                this.router.navigate(['/plus'], { replaceUrl: true });
            } else {
                this.router.navigate(['/events'], { replaceUrl: true });
            }
            return of(EnmEventActions.enmEventListRequest());
        }))
    );

    createUserRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.createUserRequest),
            exhaustMap(
                (action) => this.createUserService.createUser(action.credentials.username, action.credentials.password, action.credentials.promoCode).pipe(
                    map(createUserSuccessResponse => AuthActions.createUserSuccessResponse({ createUserSuccessResponse })),
                    catchError((error) => {
                        this.messageService.add({ key: 'createUserError', severity: 'error', summary: error?.error.error, detail: 'Try again' })
                        return of(AuthActions.createUserErrorResponse({ error }))
                    })
                ), 
            )
        )
    );

    creatUserSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.createUserSuccessResponse),
            tap(createUserSuccessResponse => {
                if (this.paymentScreenSkippedService.paymentScreenSkipped) {
                    this.paymentScreenSkippedService.paymentScreenSkipped = false;
                    this.currentUser$.pipe(take(1)).subscribe(user => {
                        if (user) {
                            let userid = user._id || user.id;
                            this.store$.dispatch(PaymentActions.enmPlusPaymentScreenWaitOnStripeCheckoutResponse({ userId: userid }));
                        }
                      })
                    this.router.navigate(['/plus'], { replaceUrl: true });
                    this.messageService.add({ 
                        key: 'continueSingingUpForRarerlyGroovyPlus', 
                        severity: 'success', 
                        summary: createUserSuccessResponse.createUserSuccessResponse.user?.username, 
                        detail: 'Account created. Purchase Rarelygroovy+ below',
                        life: 7000,
                    })
                } else {
                    this.router.navigate(['/events'], { replaceUrl: true });
                    this.messageService.add({ key: 'welcomeUser', severity: 'success', summary: createUserSuccessResponse.createUserSuccessResponse.user?.username, detail: this.getRandomWelcomeMessage() })
                }
            })
        ),
        { dispatch: false }
    );

    refreshUserRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.refreshUserRequest),
            exhaustMap(
                (action) => this.userService.getUser(action.credentials.username).pipe(
                    map(refreshUserSuccessResponse => AuthActions.refreshUserSuccessResponse({ refreshUserSuccessResponse })),
                    catchError((error: RefreshUserErrorResponse) => {
                        return of(AuthActions.logInErrorResponse({ error }))
                    })
                ), 
            )
        )
    );

    logOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logOut),
            tap(_ => {
                localStorage.clear()
                this.router.navigate(['/'], { replaceUrl: true })
            })
        ),
        { dispatch: false }
    )
}