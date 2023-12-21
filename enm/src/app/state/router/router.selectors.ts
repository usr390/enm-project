import { getRouterSelectors } from "@ngrx/router-store"; 
import { AppState } from "./../app.state";

export const selectFeature = (state: AppState) => state.router;
export const { 
    selectCurrentRoute, 
    selectFragment, 
    selectQueryParams,
    selectQueryParam, 
    selectRouteParams, 
    selectRouteParam, 
    selectRouteData, 
    selectUrl,
} = getRouterSelectors(selectFeature);