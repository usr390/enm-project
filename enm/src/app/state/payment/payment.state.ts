export interface PaymentState {
    plusSubscriptionCardLoading: boolean,
    furthestEventMonth: string,
    defunctArtistsCount: string,
    checkoutScreenLoading: boolean,
    checkoutScreenLoaded: boolean
}

export const initialState: PaymentState = {
    plusSubscriptionCardLoading: false,
    furthestEventMonth: '',
    defunctArtistsCount: '',
    checkoutScreenLoading: false,
    checkoutScreenLoaded: false
}