import { EnmEventListRequestErrorResponse } from 'src/app/models/enmEventListRequestErrorResponse';
import { EnmEvent } from '../../models/enm-event.model';

export interface EnmEvents {
  [id: string]: EnmEvent;
}

export interface Filter {
  text: string;
  recentlyListed: boolean;
  touring: boolean;
}

export interface EnmEventsState {
  entities: EnmEvents;
  filter: Filter;
  loaded: boolean;
  loading: boolean;
  selectedEnmEvent: string,
  enmEventListRequestErrorResponse: EnmEventListRequestErrorResponse
}

export const initialState: EnmEventsState = {
  entities: {},
  filter: {
    text: '',
    recentlyListed: false,
    touring: false
  },
  loaded: false,
  loading: false,
  selectedEnmEvent: '',
  enmEventListRequestErrorResponse: null
};