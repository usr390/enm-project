import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from "rxjs";
import * as blogActions from './blog.actions';
import { EnmEventService } from "src/app/core/services/enm-event.service";
import { BlogService } from "src/app/core/services/blog.service";


@Injectable()
export class BlogEffects {
    constructor(private actions$: Actions, private blogService: BlogService) {}

    enmEventListRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(blogActions.blogListRequest),
            exhaustMap(
                _ => this.blogService.getBlogList().pipe(
                    map(blogs => blogActions.blogListRequestSuccessResponse({ blogs })),
                    catchError((error) => of(blogActions.blogListRequestErrorResponse({ error })))
                ), 
            )
        )
    );
}