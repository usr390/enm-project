import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PaymentState } from "./payment.state";
import { AppState } from "../app.state";

export const selectFeature = (state: AppState): PaymentState => state.payment;
export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const plusSubscriptionCardLoading = createSelector(
    selectFeature,
    (state: PaymentState): boolean => state.plusSubscriptionCardLoading
  );