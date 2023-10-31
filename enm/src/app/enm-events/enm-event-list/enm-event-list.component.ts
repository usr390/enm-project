import { Component, OnInit } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { EnmEventService } from './../../core/services/enm-event.service';
import { EnmEvent } from '../../models/enm-event.model';
import { DateTime } from 'luxon';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../state/auth/auth.reducer';
import * as enmEventsActions from './../../state/enmEvents/enmEvents.actions';

@Component({
  selector: 'app-enm-event-list',
  templateUrl: './enm-event-list.component.html',
  styleUrls: ['./enm-event-list.component.less']
})
export class EnmEventListComponent implements OnInit {

  user$ = this.store$.select(fromAuth.selectUser);

  filteredEnmEventList$ = combineLatest([this.enmEventService.enmEvents$, this.enmEventService.enmEventListFilterAction$]).pipe(
    map(([enmEvents, userSuppliedFilter]) => enmEvents.filter(enmEvent => Object.values([...Object.values(enmEvent.tags), ...Object.values(enmEvent.artists)]).toString().toLowerCase().indexOf(userSuppliedFilter.toLowerCase() ?? '') != -1 )),
  );

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

  constructor(private store$: Store, private enmEventService: EnmEventService) { }

  ngOnInit(): void {}

  onEnmEventListSelection(_id: string | undefined) { 
    this.store$.dispatch(enmEventsActions.selectEventFromEventList({_id: _id as string}))
    this.enmEventService.updateEnmEventIdSpotlight(_id!); 
  }

}

