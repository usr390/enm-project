import { Action, createReducer, on } from "@ngrx/store";
import { 
    myAccountGetUpcomingSubscriptionRenewalDate,
    myAccountGetUpcomingSubscriptionRenewalDateSuccessResponse,
    myAccountGetUpcomingSubscriptionRenewalDateErrorResponse,
    myAccountCancelSubscription,
    myAccountCancelSubscriptionSuccessResponse,
    myAccountCancelSubscriptionErrorResponse, 
} from "./rarelygroovyPlus.actions";
import { RarelygroovyPlusState, initialState} from './rarelygroovyPlus.state'

const _rarelygroovPlusReducer = createReducer(
    initialState,
    on(myAccountGetUpcomingSubscriptionRenewalDate, (state) => {
        return {
            ...state,
            isUpcomingSubscriptionRenewalDateLoading: true
        }
    }),
    on(myAccountGetUpcomingSubscriptionRenewalDateSuccessResponse, (state, { upcomingSubscriptionRenewalDateSuccessResponse }) => {
        return {
            ...state,
            isUpcomingSubscriptionRenewalDateLoading: false,
            nextInvoiceDate: upcomingSubscriptionRenewalDateSuccessResponse ? upcomingSubscriptionRenewalDateSuccessResponse.nextInvoiceDate : null
        }
    }),
    on(myAccountGetUpcomingSubscriptionRenewalDateErrorResponse, (state) => {
        return {
            ...state,
            isUpcomingSubscriptionRenewalDateLoading: false
        }
    }),
    on(myAccountCancelSubscription, (state) => {
        return {
            ...state,
            isSubscriptionCanceling: true
        }
    }),
    on(myAccountCancelSubscriptionSuccessResponse, (state) => {
        return {
            ...state,
            isSubscriptionCanceling: false,
        }
    }),
    on(myAccountCancelSubscriptionErrorResponse, (state) => {
        return {
            ...state,
            isSubscriptionCanceling: false
        }
    }),
);

export function rarelygroovyPlusReducer(state: RarelygroovyPlusState | undefined, action: Action) {
    return _rarelygroovPlusReducer(state, action)
}