import { createAction, props } from '@ngrx/store'
import { CancelRarelygroovyPlusSubscriptionErrorResponse } from 'src/app/models/cancelRarelygroovyPlusSubscriptionErrorResponse';
import { CancelRarelygroovyPlusSubscriptionSuccessResponse } from 'src/app/models/cancelRarelygroovyPlusSubscriptionSuccessResponse';
import { UpcomingSubscriptionRenewalDateErrorResponse } from 'src/app/models/upcomingSubscriptionRenewalDateErrorResponse';
import { UpcomingSubscriptionRenewalDateSuccessResponse } from 'src/app/models/upcomingSubscriptionRenewalDateSuccessResponse';

export const myAccountNavigateTo = createAction('[My Account] Navigate To');

export const myAccountGetUpcomingSubscriptionRenewalDate = createAction('[My Account] Wait On Upcoming Subscription Renewal Date', props<{ userId: string }>());
export const myAccountGetUpcomingSubscriptionRenewalDateSuccessResponse = createAction('[My Account] Wait On Upcoming Subscription Renewal Date Success Response', props<{ upcomingSubscriptionRenewalDateSuccessResponse: UpcomingSubscriptionRenewalDateSuccessResponse }>());
export const myAccountGetUpcomingSubscriptionRenewalDateErrorResponse = createAction('[My Account] Wait On Upcoming Subscription Renewal Date Error Response', props<{ upcomingSubscriptionRenewalDateErrorResponse: UpcomingSubscriptionRenewalDateErrorResponse}>());

export const myAccountCancelSubscription = createAction('[My Account] Cancel Subscription', props<{ userId: string }>());
export const myAccountCancelSubscriptionSuccessResponse = createAction('[My Account] Cancel Subscription Success Response', props<{ cancelSubscriptionSuccessResponse: CancelRarelygroovyPlusSubscriptionSuccessResponse }>());
export const myAccountCancelSubscriptionErrorResponse = createAction('[My Account] Cancel Subscription Error Response', props<{ cancelSubscriptionErrorResponse: CancelRarelygroovyPlusSubscriptionErrorResponse }>());
