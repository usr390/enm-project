export interface PaymentState {
    plusSubscriptionCardLoading: boolean,
    furthestEventMonth: string
}

export const initialState: PaymentState = {
    plusSubscriptionCardLoading: false,
    furthestEventMonth: '',
}