import { AuthState } from "./auth/auth.reducer";
import { FormState } from "./form/form.reducer";
import { PaymentState } from "./payment/payment.reducer";

export interface AppState {
    auth: AuthState;
    form: FormState;
    payment: PaymentState
}
