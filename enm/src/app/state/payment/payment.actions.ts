import { createAction, props } from '@ngrx/store'
import { NullableUser } from 'src/app/models/user.model';

export const enmPlusMonthlySubscriptionPaymentSubmission = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Submission', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentSuccessReponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Sucess Reponse', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentErrorResponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Error Response');

