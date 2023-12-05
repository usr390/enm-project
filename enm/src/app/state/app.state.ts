import { AuthState } from './auth/auth.state'
import { FormState, formReducer } from './form/form.reducer'
import { EnmEventsState } from './enmEvents/enmEvent.state'
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { enmEventsReducer } from './enmEvents/enmEvents.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

export interface AppState {
    auth: AuthState;
    form: FormState;
    enmEvents: EnmEventsState;
    router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    form: formReducer,
    enmEvents: enmEventsReducer,
    router: routerReducer,
};

export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer,
];