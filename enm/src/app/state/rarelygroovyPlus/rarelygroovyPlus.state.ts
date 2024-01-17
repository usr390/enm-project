export interface RarelygroovyPlusState {
    nextInvoiceDate: string | null,
    subscriptionStatus: string,
    invoiceHistory: any,
    cancellationDate: string,
    isUpcomingSubscriptionRenewalDateLoading: boolean,
    isUpcomingSubscriptionRenewalDateLoaded: boolean,
    isSubscriptionCanceling: boolean,
    isSubscriptionCanceled: boolean
}

export const initialState: RarelygroovyPlusState = {
    nextInvoiceDate: '',
    subscriptionStatus: '',
    invoiceHistory: [],
    cancellationDate: '',
    isUpcomingSubscriptionRenewalDateLoading: false,
    isUpcomingSubscriptionRenewalDateLoaded: false,
    isSubscriptionCanceling: false,
    isSubscriptionCanceled: false
}