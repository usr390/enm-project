import { AuthState } from "./auth/auth.reducer";
import { FormState } from "./form/form.reducer";

export interface AppState {
    auth: AuthState;
    form: FormState;
}
