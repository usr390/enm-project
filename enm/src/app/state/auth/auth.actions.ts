import { createAction, props } from '@ngrx/store'
import { EnmEventAddFormState } from 'src/app/models/enmEventAddFormState';
import { LogInErrorResponse } from 'src/app/models/logInErrorResponse.model';
import { LogInSuccessResponse } from 'src/app/models/logInSuccessResponse.model';
import { NullableUser } from 'src/app/models/user.model';

export const logInRequest = createAction('[Log In Screen] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccessResponse = createAction('[Log In API Endpoint] Log In Succes Response', props<{ logInSuccessResponse: LogInSuccessResponse }>()); 
export const logInErrorResponse = createAction('[Log In API Endpoint] Log In Error Response', props<{ error: LogInErrorResponse }>()); 

export const logOut = createAction('[Sidebar Component] Log Out'); 

export const rehydrateFromBrowserLocalStorage = createAction('[App] Rehydrate From Browser Local Storage', props<{ user: NullableUser, logInErrorResponse: LogInErrorResponse }>())

export const updateForm = createAction('[All "Add Event" Form Related Screens] Update Form Fields', props<{ formValue: EnmEventAddFormState }>());