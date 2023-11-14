import { AuthState } from "./auth/auth.state";
import { EnmEventsState } from "./enmEvents/enmEvent.state"
import { FormState } from "./form/form.reducer";

export interface AppState {
    auth: AuthState;
    form: FormState;
    enmEvents: EnmEventsState;
}
