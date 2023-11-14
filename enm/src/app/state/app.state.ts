import { AuthState, initialState as authInitalState } from './auth/auth.state'
import { FormState, initialState as formInitialState } from './form/form.reducer'
import { EnmEventsState, initialState as enmEventsInitalState } from './enmEvents/enmEvent.state'

export interface AppState {
    auth: AuthState;
    form: FormState;
    enmEvents: EnmEventsState;
}

export const initialState: AppState = {
    auth: authInitalState,
    form: formInitialState,
    enmEvents: enmEventsInitalState
}