export interface RarelygroovyPlusState {
    isUpcomingSubscriptionRenewalDateLoading: boolean,
    isUpcomingSubscriptionRenewalDateLoaded: boolean,
    isSubscriptionCanceling: boolean,
    isSubscriptionCanceled: boolean
}

export const initialState: RarelygroovyPlusState = {
    isUpcomingSubscriptionRenewalDateLoading: false,
    isUpcomingSubscriptionRenewalDateLoaded: false,
    isSubscriptionCanceling: false,
    isSubscriptionCanceled: false
}