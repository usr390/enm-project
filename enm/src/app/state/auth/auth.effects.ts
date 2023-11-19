import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LogInService } from "src/app/core/services/login.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as AuthActions from './auth.actions';
import { CreateUserService } from "src/app/core/services/create-user.service";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private logInService: LogInService,
        private createUserService: CreateUserService,
        private router: Router
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
            tap(_ => this.router.navigate(['/']))
        ),
        { dispatch: false }
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
        tap(_ => this.router.navigate(['/']))
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