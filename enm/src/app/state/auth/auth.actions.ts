import { createAction, props } from '@ngrx/store'
import { EnmEventAddFormState } from 'src/app/models/enmEventAddFormState';
import { LogInErrorResponse } from 'src/app/models/logInErrorResponse.model';
import { LogInSuccessResponse } from 'src/app/models/logInSuccessResponse.model';
import { NullableUser } from 'src/app/models/user.model';

export const logInRequest = createAction('[Auth] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccessResponse = createAction('[Auth] Log In Succes Response', props<{ logInSuccessResponse: LogInSuccessResponse }>()); 
export const logInErrorResponse = createAction('[Auth] Log In Error Response', props<{ error: LogInErrorResponse }>()); 

export const logOut = createAction('[Auth] Log Out'); 

export const rehydrateFromBrowserLocalStorage = createAction('[App] Rehydrate From Browser Local Storage', props<{ user: NullableUser, logInErrorResponse: LogInErrorResponse }>())

export const updateForm = createAction('[Form] Update Form Fields', props<{ formValue: EnmEventAddFormState }>());