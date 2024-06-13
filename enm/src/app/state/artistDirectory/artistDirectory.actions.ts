import { createAction, props } from '@ngrx/store'
import { ArtistDirectoryErrorResponse } from 'src/app/models/artistDirectoryErrorResponse.model';
import { ArtistDirectorySuccessResponse } from 'src/app/models/artistDirectorySuccessReponse.model';


export const artistDirectoryRequest = createAction('[Artist Directory Screen] Artist Directory Request'); 
export const artistDirectoryRequestSuccessResponse = createAction('[Artist Directory Screen] Artist Directory Request Success Response', props<{ artistDirectorySuccessResponse: ArtistDirectorySuccessResponse }>()); 
export const artistDirectoryRequestErrorResponse = createAction('[Artist Directory Screen] Artist Directory Request Error Response', props<{ artistDirectoryErrorResponse: ArtistDirectoryErrorResponse }>()); 

export const artistDirectoryFilter = createAction('[Artist Directory Screen] Artists Directory Filter', props<{ text: string, recentlyListed: boolean, sortByYearDescending: boolean, rock: boolean, punk: boolean, metal: boolean, edm: boolean, rap: boolean, jazz: boolean, pop: boolean, experimental: boolean, latin: boolean, other: boolean }>()); 
