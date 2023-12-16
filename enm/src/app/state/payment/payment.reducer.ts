import { Action, createReducer, on } from "@ngrx/store";
import { PaymentState, initialState } from './payment.state'
import { 
    enmPlusPaymentScreenWaitOnFurthestMonth, 
    enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse, 
    enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse 
} from "../payment/payment.actions";


const _paymentReducer = createReducer(
    initialState,
    on(enmPlusPaymentScreenWaitOnFurthestMonth, (state) => {
        return {
            ...state,
            plusSubscriptionCardLoading: true,
            plusSubscriptionCardLoaded: false
        }
    }),
    on(enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse, (state) => {
        return {
            ...state,
            plusSubscriptionCardLoading: false,
            plusSubscriptionCardLoaded: true,
        }
    }),
    on(enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse, (state) => {
        return {
            ...state,
            plusSubscriptionCardLoading: false,
            plusSubscriptionCardLoaded: true
        }
    }),
);

export function paymentReducer(state: PaymentState | undefined, action: Action) {
    return _paymentReducer(state, action)
}