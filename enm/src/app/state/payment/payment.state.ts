export interface PaymentState {
    plusSubscriptionCardLoading: boolean,
    furthestEventMonth: string,
    checkoutScreenLoading: boolean,
    checkoutScreenLoaded: boolean
}

export const initialState: PaymentState = {
    plusSubscriptionCardLoading: false,
    furthestEventMonth: '',
    checkoutScreenLoading: false,
    checkoutScreenLoaded: false
}