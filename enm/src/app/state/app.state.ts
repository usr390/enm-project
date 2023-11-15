import { AuthState } from './auth/auth.state'
import { FormState, formReducer } from './form/form.reducer'
import { EnmEventsState } from './enmEvents/enmEvent.state'
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { enmEventsReducer } from './enmEvents/enmEvents.reducer';

export interface AppState {
    auth: AuthState;
    form: FormState;
    enmEvents: EnmEventsState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    form: formReducer,
    enmEvents: enmEventsReducer
};