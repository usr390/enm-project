export interface RarelygroovyPlusState {
    nextInvoiceDate: string | null,
    subscriptionStatus: string,
    cancellationDate: string,
    isUpcomingSubscriptionRenewalDateLoading: boolean,
    isUpcomingSubscriptionRenewalDateLoaded: boolean,
    isSubscriptionCanceling: boolean,
    isSubscriptionCanceled: boolean
}

export const initialState: RarelygroovyPlusState = {
    nextInvoiceDate: '',
    subscriptionStatus: '',
    cancellationDate: '',
    isUpcomingSubscriptionRenewalDateLoading: false,
    isUpcomingSubscriptionRenewalDateLoaded: false,
    isSubscriptionCanceling: false,
    isSubscriptionCanceled: false
}