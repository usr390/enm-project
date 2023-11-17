import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { EnmEventService } from './../../core/services/enm-event.service';
import { EnmEvent } from '../../models/enm-event.model';
import { DateTime } from 'luxon';
import { Store } from '@ngrx/store';
import * as AuthSelectors from './../../state/auth/auth.selectors';
import * as fromEnmEvent from './../../state/enmEvents/enmEvents.selectors';
import * as enmEventsActions from './../../state/enmEvents/enmEvents.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-enm-event-list',
  templateUrl: './enm-event-list.component.html',
  styleUrls: ['./enm-event-list.component.less']
})
export class EnmEventListComponent implements OnInit {

  user$ = this.store$.select(AuthSelectors.selectUser);
  filteredEnmEventList$ = this.store$.select(fromEnmEvent.selectFiltered);
  listLoading$ = this.store$.select(fromEnmEvent.selectLoading);

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

  constructor(private store$: Store<AppState>, private enmEventService: EnmEventService) { }

  ngOnInit(): void {
    this.store$.dispatch(enmEventsActions.enmEventListRequest())
  }

  onEnmEventListSelection(_id: string | undefined) { 
    this.store$.dispatch(enmEventsActions.selectEventFromEventList({_id: _id as string}))
    this.enmEventService.updateEnmEventIdSpotlight(_id!); 
  }

}

