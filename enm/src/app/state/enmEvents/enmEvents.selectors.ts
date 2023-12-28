import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EnmEvent } from "../../models/enm-event.model";
import { Filter, EnmEventsState } from "./enmEvent.state";

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
      const normalizedFilter = normalizeText(filter.text);

      return enmEvents.filter(enmEvent =>
        // check if any tags match the filter text
        Object.values(enmEvent.tags).some(tag => 
          normalizeText(tag.toString()).includes(normalizedFilter)
        ) ||
        // check if any artist names match the filter text
        enmEvent.artists.some(artist => 
          normalizeText(artist.name).includes(normalizedFilter)
        )
      );
    } else {
      return enmEvents;
    }
  }
);

// function to normalize text by removing special characters, diacritics and converting to lowercase
const normalizeText = (text: string) => {
  const from = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ";
  const to   = "AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn";
  let normalizedText = text.toLowerCase();
  for (let i = 0; i < from.length; i++) {
    normalizedText = normalizedText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // replace other non-alphanumeric characters
  normalizedText = normalizedText.replace(/[^\w\s]/gi, '');

  return normalizedText;
};



export const selectSelectedEventId = createSelector(
  selectFeature,
  (state: EnmEventsState): string => state.selectedEnmEvent
);

export const selectLoading = createSelector(
  selectFeature,
  (state: EnmEventsState): boolean => state.loading
);

export const selectLoaded = createSelector(
  selectFeature,
  (state: EnmEventsState): boolean => state.loaded
);

export const selectedFilterText = createSelector(
  selectFeature,
  (state: EnmEventsState): string => state.filter.text
);
