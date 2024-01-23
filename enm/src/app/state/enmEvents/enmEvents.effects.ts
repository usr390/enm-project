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
                _ => this.enmEventService.getEnmEventList().pipe(
                    map(enmEvents => this.processEvents(enmEvents)),
                    map(enmEvents => enmEventActions.enmEventListRequestSuccessResponse({ enmEvents })),
                    catchError((error) => of(enmEventActions.enmEventListRequestErrorResponse({ error })))
                ), 
            )
        )
    );

    private processEvents(events: any[]): any[] {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        return events.map(event => {
            const eventDate = new Date(event.creationDateTime);
            return {
              ...event,
              isRecentlyListed: eventDate > twoDaysAgo
            };
        });
    }
}