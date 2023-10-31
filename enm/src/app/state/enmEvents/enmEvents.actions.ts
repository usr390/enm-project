import { createAction, props } from '@ngrx/store'

export const selectEventFromEventList = createAction('[Enm Events] Select Event From Event List', props<{ _id: string }>()); 
