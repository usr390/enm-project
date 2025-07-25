import { createAction, props } from '@ngrx/store'
import { NullableUser } from 'src/app/models/user.model';

export const enmPlusPaymentScreenNavigateTo = createAction('[Enm Plus Payment Screen] Navigate To');

export const enmPlusPaymentScreenWaitOnFurthestMonth = createAction('[Enm Plus Payment Screen] Wait On Furthest Month');
export const enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse = createAction('[Enm Plus Payment Screen] Wait On Furthest Month Success Response', props<{ enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse: string }>());
export const enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse = createAction('[Enm Plus Payment Screen] Wait On Furthest Month Error Response');

export const enmPlusMonthlySubscriptionPaymentSubmission = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Submission', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentSuccessReponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Sucess Reponse', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentErrorResponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Error Response');

export const enmPlusPaymentScreenWaitOnStripeCheckoutResponse = createAction('[Enm Plus Payment Screen] Wait On Stripe Checkout Response', props<{ userId: string }>());

interface StripeCheckoutSession {
    clientSecret: string
  }
export const enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse = createAction('[Enm Plus Payment Screen] Wait On Stripe Checkout Success Response', props<{ enmPlusPaymentScreenWaitOnStripeCheckoutSuccessResponse: StripeCheckoutSession }>());
export const enmPlusPaymentScreenWaitOnStripeCheckoutErrorResponse = createAction('[Enm Plus Payment Screen] Wait On Stripe Checkout Error Response');

export const enmPlusPaymentScreenWaitOnDefunctArtistsCount = createAction('[Enm Plus Payment Screen] Wait On Defunct Artists Count');
export const enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse = createAction('[Enm Plus Payment Screen] Wait On Defunct Artists Count Success Response', props<{ enmPlusPaymentScreenWaitOnDefunctArtistsCountSuccessResponse: string }>());
export const enmPlusPaymentScreenWaitOnDefunctArtistsCountErrorResponse = createAction('[Enm Plus Payment Screen] Wait On Defunct Artists Count Error Response');