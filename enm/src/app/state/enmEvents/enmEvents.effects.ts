import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as enmEventActions from './enmEvents.actions';
import { EnmEventService } from "src/app/core/services/enm-event.service";


@Injectable()
export class EnmEventsEffects {
    constructor(private actions$: Actions, private enmEventService: EnmEventService) {}

    enmEventListRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(enmEventActions.enmEventListRequest),
            exhaustMap(
                _ => this.enmEventService.enmEvents$.pipe(
                    map(enmEvents => enmEventActions.enmEventListRequestSuccessResponse({ enmEvents })),
                    catchError((error) => of(enmEventActions.enmEventListRequestErrorResponse({ error })))
                ), 
            )
        )
    );
}