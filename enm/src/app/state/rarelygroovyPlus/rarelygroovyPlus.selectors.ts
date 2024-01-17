import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RarelygroovyPlusState } from "./rarelygroovyPlus.state";
import { AppState } from "../app.state";

export const selectFeature = (state: AppState): RarelygroovyPlusState => state.rarelygroovyPlus;
export const selectPaymentState = createFeatureSelector<RarelygroovyPlusState>('payment');

export const isUpcomingSubscriptionRenewalDateLoading = createSelector(
  selectFeature,
  (state: RarelygroovyPlusState): boolean => state.isUpcomingSubscriptionRenewalDateLoading
);

export const isSubscriptionCanceling = createSelector(
  selectFeature,
  (state: RarelygroovyPlusState): boolean => state.isSubscriptionCanceling
);

export const subscriptionStatus = createSelector(
  selectFeature,
  (state: RarelygroovyPlusState): string => state.subscriptionStatus
);

export const subscriptionCancellationDate = createSelector(
  selectFeature,
  (state: RarelygroovyPlusState): string => state.cancellationDate
);


export const selectNextRarelygroovySubscriptionInvoice = createSelector(
  selectFeature,
  (state: RarelygroovyPlusState): string | null => state.nextInvoiceDate
);