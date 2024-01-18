import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from './../app.state';
import * as HydrationActions from './hydration.actions';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrateFromBrowserLocalStorageIntoNgRxStore$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const localStorageState = localStorage.getItem('state');
        if (localStorageState) {
          try {
            const state = JSON.parse(localStorageState);
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            localStorage.removeItem('state');
          }
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serializeNgRxStoreIntoBroswerLocalStorage$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          HydrationActions.hydrateSuccess,
          HydrationActions.hydrateFailure
        ),
        switchMap(() => this.store$),
        distinctUntilChanged(),
        tap((state) => {
          const persistableState = {
            ...state,
            enmEvents: {
              entities: state.enmEvents.entities,
              filter: '',
              selectedEnmEvent: state.enmEvents.selectedEnmEvent,
            },
            router: undefined,
            rarelygroovyPlus: undefined
          };
          localStorage.setItem('state', JSON.stringify(persistableState)); // 'persistable' not in the sense that there are parts of state that can't be persisted, it's more like 'these are the parts of state we care about persisting'
        })
      ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private store$: Store<AppState>) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}