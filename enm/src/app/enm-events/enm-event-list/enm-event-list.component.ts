import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { EnmEventService } from './../../core/services/enm-event.service';
import { EnmEvent } from './../enm-event.model';
import { DateTime } from 'luxon';
import { Store } from '@ngrx/store';

import * as fromAuth from './../../state/auth/auth.reducer'

@Component({
  selector: 'app-enm-event-list',
  templateUrl: './enm-event-list.component.html',
  styleUrls: ['./enm-event-list.component.less']
})
export class EnmEventListComponent implements OnInit {

  filteredEnmEventList$ = combineLatest([this.enmEventService.enmEvents$, this.enmEventService.enmEventListFilterAction$]).pipe(
    map(([enmEvents, userSuppliedFilter]) => enmEvents.filter(enmEvent => Object.values(enmEvent).toString().toLowerCase().indexOf(userSuppliedFilter.toLowerCase() ?? '') != -1 )),
  );

  user$ = this.store.select(fromAuth.selectUser);

  groupedByDateEnmEventList$ = this.filteredEnmEventList$.pipe(
    map((events) => {
      const enmEventsGroupedByDate = new Map<string, EnmEvent[]>();
      events.forEach(event => {
        let dateTime = DateTime.fromISO(event.dateTime);
        const dateKey = dateTime.toFormat('yyyy') + dateTime.toFormat('LL') + dateTime.toFormat('dd');
        if (!enmEventsGroupedByDate.has(dateKey)) enmEventsGroupedByDate.set(dateKey, []);
        enmEventsGroupedByDate.get(dateKey)!.push(event);
      });
      return enmEventsGroupedByDate;
    }),
  );

  constructor(private enmEventService: EnmEventService, private store: Store) { }

  ngOnInit(): void {}

  onEnmEventListSelection(id: number | undefined) { this.enmEventService.updateEnmEventIdSpotlight(id!); }

}

