import { createAction, props } from '@ngrx/store'

export const myAccountNavigateTo = createAction('[My Account] Navigate To');

export const myAccountGetUpcomingSubscriptionRenewalDate = createAction('[My Account] Wait On Upcoming Subscription Renewal Date');
export const myAccountGetUpcomingSubscriptionRenewalDateSuccessResponse = createAction('[My Account] Wait On Upcoming Subscription Renewal Date Success Response', props<{ UpcomingSubscriptionRenewalDateSuccessResponse: string }>());
export const myAccountGetUpcomingSubscriptionRenewalDateErrorResponse = createAction('[My Account] Wait On Upcoming Subscription Renewal Date Error Response', props<{UpcomingSubscriptionRenewalDateErrorResponse: string}>());

export const myAccountCancelSubscription = createAction('[My Account] Cancel Subscription');
export const myAccountCancelSubscriptionSuccessResponse = createAction('[My Account] Cancel Subscription Success Response', props<{ UpcomingSubscriptionRenewalDateSuccessResponse: string }>());
export const myAccountCancelSubscriptionErrorResponse = createAction('[My Account] Cancel Subscription Error Response', props<{ UpcomingSubscriptionRenewalDateErrorResponse: string }>());
