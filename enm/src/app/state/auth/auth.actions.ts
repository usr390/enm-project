import { createAction, props } from '@ngrx/store'
import { AuthLogInResponse } from 'src/app/models/logInResponse.model';

export const logInRequest = createAction('[Auth] Log In Request', props<{ credentials: { username: string, password: string } }>()); 
export const logInSuccess = createAction('[Auth] Log In Success', props<{ logInSuccessResponse: AuthLogInResponse }>()); 
export const logInFailure = createAction('[Auth] Log In Failure', props<{ error: string }>()); 