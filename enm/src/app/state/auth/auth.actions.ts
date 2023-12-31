import { createAction, props } from '@ngrx/store'
import { CreateUserErrorResponse } from 'src/app/models/createUserErrorResponse';
import { CreateUserSuccessResponse } from 'src/app/models/createUserSuccessResponse';
import { EnmEventAddFormState } from 'src/app/models/enmEventAddFormState';
import { LogInErrorResponse } from 'src/app/models/logInErrorResponse.model';
import { LogInSuccessResponse } from 'src/app/models/logInSuccessResponse.model';
import { RefreshUserErrorResponse } from 'src/app/models/refreshUserErrorResponse';
import { RefreshUserSuccessResponse } from 'src/app/models/refreshUserSuccessResponse';
import { NullableUser } from 'src/app/models/user.model';

export const refreshUserRequest = createAction('[Global] Refresh User Request', props<{ credentials: { username: string } }>()); 
export const refreshUserSuccessResponse = createAction('[Global] Refresh User Success Response', props<{ refreshUserSuccessResponse: RefreshUserSuccessResponse }>()); 
export const refreshErrorResponse = createAction('[Global] Refresh User Error Response', props<{ error: RefreshUserErrorResponse }>()); 

export const logInRequest = createAction('[Log In Screen] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccessResponse = createAction('[Log In API Endpoint] Log In Succes Response', props<{ logInSuccessResponse: LogInSuccessResponse }>()); 
export const logInErrorResponse = createAction('[Log In API Endpoint] Log In Error Response', props<{ error: LogInErrorResponse }>()); 

export const createUserRequest = createAction('[Create Account Screen] Create User Request', props<{ credentials: { username: string, password: string } }>()); 
export const createUserSuccessResponse = createAction('[Create Account Screen] Create User Success Response', props<{ createUserSuccessResponse: CreateUserSuccessResponse }>()); 
export const createUserErrorResponse = createAction('[Create Account Screen] Create User Error Response', props<{ error: CreateUserErrorResponse }>()); 

export const logOut = createAction('[Sidebar Component] Log Out'); 

export const rehydrateFromBrowserLocalStorage = createAction('[App] Rehydrate From Browser Local Storage', props<{ user: NullableUser, logInErrorResponse: LogInErrorResponse }>())

export const updateForm = createAction('[All "Add Event" Form Related Screens] Update Form Fields', props<{ formValue: EnmEventAddFormState }>());