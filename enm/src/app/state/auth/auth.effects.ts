import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/core/services/login.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private loginService: LoginService, private router: Router) {}

    logInRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logInRequest),
            exhaustMap(
                (action) => this.loginService.login(action.credentials.username, action.credentials.password).pipe(
                    tap(response => console.log('LoginService response:', response)),
                    map((logInSuccessResponse) => AuthActions.logInSuccess({ logInSuccessResponse })),
                    catchError((error) => of(AuthActions.logInFailure({ error })))
                ), 
            )
        )
    );

    logInSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.logInSuccess),
            tap(({ logInSuccessResponse }) => {
                this.router.navigate(['/']);
                alert('Log In Successful ' + logInSuccessResponse.user?.username)
            })
        ),
        { dispatch: false }
    );
}