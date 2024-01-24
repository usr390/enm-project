import { createAction, props } from '@ngrx/store'
import { EnmEvent } from 'src/app/models/enm-event.model';
import { EnmEventListRequestErrorResponse } from 'src/app/models/enmEventListRequestErrorResponse';

export const selectEventFromEventList = createAction('[Enm Events] Event Selected From Event List', props<{ _id: string }>());

export const enmEventListRequest = createAction('[Enm Events List Screen] Enm Event List HTTP Request'); 
export const enmEventListRequestSuccessResponse = createAction('[Enm Events List Screen] Enm Event List HTTP Request Success Response', props<{ enmEvents: EnmEvent[] }>()); 
export const enmEventListRequestErrorResponse = createAction('[Enm Events List Screen] Enm Event List HTTP Request Error Response', props<{ error: EnmEventListRequestErrorResponse }>()); 

export const enmEventListFilter = createAction('[Enm Events List Screen] Enm Event List Filter', props<{ text: string, recentlyListed: boolean, touring: boolean }>()); 
