import { createAction, props } from '@ngrx/store'
import { LogInResponse } from 'src/app/models/logInResponse.model';

export const logInRequest = createAction('[Auth] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccess = createAction('[Auth] Log In Success', props<{ logInSuccessResponse: LogInResponse }>()); 
export const logInFailure = createAction('[Auth] Log In Failure', props<{ error: string }>()); 

export const logOut = createAction('[Auth] Log Out'); 
