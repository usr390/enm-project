import { Action, createReducer, on } from "@ngrx/store";
import { PaymentState, initialState } from './payment.state'
import { 
    enmPlusPaymentScreenWaitOnFurthestMonth, 
    enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse, 
    enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse,
    enmPlusPaymentScreenWaitOnStripeCheckoutResponse,
    enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse,
    enmPlusPaymentScreenWaitOnStripeCheckoutErrorResponse,
    enmPlusPaymentScreenWaitOnDefunctArtistsCount,
    enmPlusPaymentScreenWaitOnDefunctArtistsCountErrorResponse,
    enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse
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
    on(enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse, (state, { enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse }) => {
        return {
            ...state,
            furthestEventMonth: enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse,
            plusSubscriptionCardLoading: false,
            plusSubscriptionCardLoaded: true
        }
    }),
    on(enmPlusPaymentScreenWaitOnDefunctArtistsCount, (state) => {
        return {
            ...state,
            plusSubscriptionCardLoading: true,
            plusSubscriptionCardLoaded: false
        }
    }),
    on(enmPlusPaymentScreenWaitOnDefunctArtistsCountErrorResponse, (state) => {
        return {
            ...state,
            plusSubscriptionCardLoading: true,
            plusSubscriptionCardLoaded: false
        }
    }),
    on(enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse, (state, { enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse }) => {
        return {
            ...state,
            defunctArtistsCount: enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse,
            // plusSubscriptionCardLoading: true,
            // plusSubscriptionCardLoaded: false
        }
    }),
    on(enmPlusPaymentScreenWaitOnStripeCheckoutResponse, (state) => {
        return {
            ...state,
            checkoutScreenLoading: true,
            checkoutScreenLoaded: false
        }
    }),
    on(enmPlusPaymentScreenWaitOnStripeCheckoutErrorResponse, (state) => {
        return {
            ...state,
            checkoutScreenLoading: false,
            checkoutScreenLoaded: true,
        }
    }),
    on(enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse, (state) => {
        return {
            ...state,
            checkoutScreenLoading: false,
            checkoutScreenLoaded: true
        }
    }),
);

export function paymentReducer(state: PaymentState | undefined, action: Action) {
    return _paymentReducer(state, action)
}