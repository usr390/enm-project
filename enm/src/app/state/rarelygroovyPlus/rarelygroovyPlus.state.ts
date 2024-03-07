export interface RarelygroovyPlusState {
    nextInvoiceDate: string | null,
    subscriptionStatus: string,
    invoiceHistory: any[],
    chargesHistory: any[],
    promoCode: any,
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
    chargesHistory: [],
    promoCode: null,
    cancellationDate: '',
    isUpcomingSubscriptionRenewalDateLoading: false,
    isUpcomingSubscriptionRenewalDateLoaded: false,
    isSubscriptionCanceling: false,
    isSubscriptionCanceled: false
}