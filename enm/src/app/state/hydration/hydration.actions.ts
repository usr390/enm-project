import { createAction, props } from '@ngrx/store';
import { AppState } from './../app.state';

export const hydrate = createAction('[ngrxOnInitEffects() Lifecycle Hook] Hydrate From Browser\'s localStorage Attempt');

export const hydrateSuccess = createAction(
  '[hydrateFromBrowserLocalStorageIntoNgRxStore$ Effect] Hydrate Success',
  props<{ state: AppState }>()
);

export const hydrateFailure = createAction('[hydrateFromBrowserLocalStorageIntoNgRxStore$ Effect] Hydrate Failure');


