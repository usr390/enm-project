import { LogInErrorResponse } from "src/app/models/logInErrorResponse.model";
import { NullableUser } from "src/app/models/user.model";

export interface AuthState {
    user: NullableUser,
    logInErrorResponse: LogInErrorResponse,
    createUserProcessing: boolean,
    logInProcessing: boolean
}

export const initialState: AuthState = {
    user: null,
    logInErrorResponse: null,
    createUserProcessing: false,
    logInProcessing: false
}