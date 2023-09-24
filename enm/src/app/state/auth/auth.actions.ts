import { createAction, props } from '@ngrx/store'
import { LogInErrorResponse } from 'src/app/models/logInErrorResponse.model';
import { LogInSuccessResponse } from 'src/app/models/logInResponse.model';

export const logInRequest = createAction('[Auth] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccessResponse = createAction('[Auth] Log In Succes Response', props<{ logInSuccessResponse: LogInSuccessResponse }>()); 
export const logInErrorResponse = createAction('[Auth] Log In Error Response', props<{ error: LogInErrorResponse }>()); 

export const logOut = createAction('[Auth] Log Out'); 
