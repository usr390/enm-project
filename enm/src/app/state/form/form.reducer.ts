import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { updateForm } from "./form.actions";
import { EnmEventAddFormState } from "src/app/models/enmEventAddFormState";

export interface FormState {
    enmEventAddFormState: EnmEventAddFormState
}

export const initialState: FormState = {
    enmEventAddFormState: null
}

const _formReducer = createReducer(
    initialState,
    on(updateForm, (state, { formValue }) => {
        return {
            ...state,
            enmEventAddFormState: formValue
        }
    })
);

export function formReducer(state: FormState | undefined, action: Action) {
    return _formReducer(state, action)
}

export const selectAuthState = createFeatureSelector<FormState>('form');

export const selectVenue = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.venue)
export const selectPromoter = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.promoter)
export const selectDate = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.date)
export const selectTime = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.startTime)
export const selectCover = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.cover)
export const selectArtists = createSelector(selectAuthState, (state) => state.enmEventAddFormState?.artists)

