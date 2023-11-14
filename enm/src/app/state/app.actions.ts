import { createAction, props } from "@ngrx/store";
import { AppState } from "./app.state";

export const rehydrateFromBrowserLocalStorage = createAction('[GLOBAL] Rehydrate From Browser Local Storage', props<{ appState: AppState }>())
