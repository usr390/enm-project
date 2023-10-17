import { createAction, props } from "@ngrx/store";
import { EnmEventAddFormState } from "src/app/models/enmEventAddFormState";

export const updateForm = createAction('[Form] Update Form Fields', props<{ formValue: EnmEventAddFormState }>());
