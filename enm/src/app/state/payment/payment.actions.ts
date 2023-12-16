import { createAction, props } from '@ngrx/store'
import { NullableUser } from 'src/app/models/user.model';

export const enmPlusPaymentScreenNavigateTo = createAction('[Enm Plus Payment Screen] Navigate To');

export const enmPlusPaymentScreenWaitOnFurthestMonth = createAction('[Enm Plus Payment Screen] Wait On Furthest Month');
export const enmPlusPaymentScreenWaitOnFurthestMonthSuccessResponse = createAction('[Enm Plus Payment Screen] Wait On Furthest Month Success Response');
export const enmPlusPaymentScreenWaitOnFurthestMonthErrorResponse = createAction('[Enm Plus Payment Screen] Wait On Furthest Month Error Response');

export const enmPlusMonthlySubscriptionPaymentSubmission = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Submission', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentSuccessReponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Sucess Reponse', props<{ user: NullableUser }>());
export const enmPlusMonthlySubscriptionPaymentErrorResponse = createAction('[Enm Plus Payment Screen] Enm Plus Monthly Subscription Payment Error Response');

