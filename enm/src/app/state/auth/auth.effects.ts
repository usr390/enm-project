import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LogInService } from "src/app/core/services/login.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, concatMap, Observable } from "rxjs";
import * as AuthActions from './auth.actions';
import * as EnmEventActions from './../enmEvents/enmEvents.actions'
import { CreateUserService } from "src/app/core/services/create-user.service";
import { MessageService } from "primeng/api";

@Injectable()
export class AuthEffects {

    getRandomWelcomeMessage() {
        const welcomeMessages = [
            "Hey there! Account created",
            "Hey! Glad to have you. Your account's been set up",
            "Your account's all set up. Rock on",
            "Hey! Your account's registration was successful",
            "All set! Account created.",
            "Howdy! Account registration successful",
            "Hey there! Happy to have you onboard"
        ];
    
        const randomMessage = Math.floor(Math.random() * welcomeMessages.length);
        return welcomeMessages[randomMessage];
    }

    constructor(
        private actions$: Actions,
        private logInService: LogInService,
        private createUserService: CreateUserService,
        private router: Router,
        private messageService: MessageService
    ) {}

    logInRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logInRequest),
            exhaustMap(
                (action) => this.logInService.logIn(action.credentials.username, action.credentials.password).pipe(
                    map(logInSuccessResponse => AuthActions.logInSuccessResponse({ logInSuccessResponse })),
                    catchError((error) => of(AuthActions.logInErrorResponse({ error })))
                ), 
            )
        )
    );

    logInSuccess$ = createEffect(() => 
        this.actions$.pipe(
        ofType(AuthActions.logInSuccessResponse),
        concatMap(_ => {
            this.router.navigate(['/']);
            return of(EnmEventActions.enmEventListRequest());
        }))
    );

    createUserRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.createUserRequest),
            exhaustMap(
                (action) => this.createUserService.createUser(action.credentials.username, action.credentials.password).pipe(
                    map(createUserSuccessResponse => AuthActions.createUserSuccessResponse({ createUserSuccessResponse })),
                    catchError((error) => of(AuthActions.createUserErrorResponse({ error })))
                ), 
            )
        )
    );

    creatUserSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.createUserSuccessResponse),
            tap(createUserSuccessResponse => {
                this.router.navigate(['/'])
                this.messageService.add({ key: 'welcomeUser', severity: 'success', summary: createUserSuccessResponse.createUserSuccessResponse.user?.username, detail: this.getRandomWelcomeMessage() })
            })
        ),
    { dispatch: false }
);

    logOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logOut),
            tap(_ => localStorage.clear())
        ),
        { dispatch: false }
    )
}