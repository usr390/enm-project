import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LogInService } from "src/app/core/services/login.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap, concatMap, Observable, take } from "rxjs";
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
import * as ArtistDirectoryActions from './../../state/artistDirectory/artistDirectory.actions';
import { ArtistDirectoryService } from "src/app/core/services/artist-directory.service";



@Injectable()
export class ArtistDirectoryEffects {

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
        private artistDirectoryService: ArtistDirectoryService,
        private userService: UserService,
        private createUserService: CreateUserService,
        private router: Router,
        private messageService: MessageService,
        private paymentScreenSkippedService: PaymentScreenSkippedService,
        private store$: Store<AppState>
    ) {}

    artistDirectoryRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ArtistDirectoryActions.artistDirectoryRequest),
            exhaustMap(
                (action) => this.artistDirectoryService.getArtistDirectory().pipe(
                    map(artists => ArtistDirectoryActions.artistDirectoryRequestSuccessResponse({ artistDirectorySuccessResponse: { artists } })),
                    catchError((error: LogInErrorResponse) => {
                        this.messageService.add({ key: 'logInError', severity: 'error', summary: error?.error.error, detail: 'Try again' })
                        return of(ArtistDirectoryActions.artistDirectoryRequestErrorResponse({
                            artistDirectoryErrorResponse: null
                        }))
                    })
                ), 
            )
        )
    );

}