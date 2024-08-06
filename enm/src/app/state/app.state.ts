import { AuthState } from './auth/auth.state'
import { FormState, formReducer } from './form/form.reducer'
import { EnmEventsState } from './enmEvents/enmEvent.state'
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { enmEventsReducer } from './enmEvents/enmEvents.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { PaymentState } from './payment/payment.state';
import { paymentReducer } from './payment/payment.reducer';
import { RarelygroovyPlusState } from './rarelygroovyPlus/rarelygroovyPlus.state';
import { rarelygroovyPlusReducer } from './rarelygroovyPlus/rarelygroovyPlus.reducer';
import { ArtistDirectoryState } from './artistDirectory/artistDirectory.state';
import { artistDirectoryReducer } from './artistDirectory/artistDirectory.reducer';
import { BlogState } from './blog/blog.state';
import { blogReducer } from './blog/blog.reducer';

export interface AppState {
    auth: AuthState;
    form: FormState;
    enmEvents: EnmEventsState;
    payment: PaymentState;
    router: RouterReducerState;
    rarelygroovyPlus: RarelygroovyPlusState
    artistDirectory: ArtistDirectoryState,
    blogs: BlogState
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    form: formReducer,
    enmEvents: enmEventsReducer,
    payment: paymentReducer,
    router: routerReducer,
    rarelygroovyPlus: rarelygroovyPlusReducer,
    artistDirectory: artistDirectoryReducer,
    blogs: blogReducer
};

export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer,
];