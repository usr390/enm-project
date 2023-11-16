import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EnmEvent } from "../../models/enm-event.model";
import { Filter, EnmEventsState, EnmEvents } from "./enmEvent.state"; // Assuming EnmEventsState is correctly defined

export const selectFeature = (state: AppState): EnmEventsState => state.enmEvents;

export const selectEntities = createSelector(
  selectFeature,
  (state: EnmEventsState): { [id: string]: EnmEvent } => state.entities
);

export const selectAll = createSelector(selectEntities, (entities): EnmEvent[] =>
  Object.values(entities)
);

export const selectFilter = createSelector(
  selectFeature,
  (state: EnmEventsState): Filter => state.filter
);

export const selectFiltered = createSelector(
  selectAll,
  selectFilter,
  (enmEvents: EnmEvent[], filter: Filter): EnmEvent[] => {
    if (filter.text) {
      const lowercased = filter.text.toLowerCase();
      return enmEvents.filter(enmEvent => Object.values([...Object.values(enmEvent.tags), ...Object.values(enmEvent.artists)]).toString().toLowerCase().indexOf(lowercased ?? '') != -1 )
    } else {
      return enmEvents;
    }
  }
);

export const selectSelectedEventId = createSelector(
  selectFeature,
  (state: EnmEventsState): string => state.selectedEnmEvent
);