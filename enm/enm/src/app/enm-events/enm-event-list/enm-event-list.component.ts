import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { EnmEventService } from '../../core/services/enm-event.service';
import { EnmEvent } from '../enm-event.model';

@Component({
  selector: 'app-enm-event-list',
  templateUrl: './enm-event-list.component.html',
  styleUrls: ['./enm-event-list.component.less']
})
export class EnmEventListComponent implements OnInit {

  filteredEnmEventList$ = combineLatest([this.enmEventService.enmEvents$, this.enmEventService.enmEventListFilterAction$]).pipe(
    map(([enmEvents, userSuppliedFilter]) => enmEvents.filter(enmEvent => Object.values(enmEvent).toString().toLowerCase().indexOf(userSuppliedFilter.toLowerCase() ?? '') != -1 )),
  );

  groupedByDateEnmEventList$ = this.filteredEnmEventList$.pipe(
    map((events) => {
      const enmEventsGroupedByDate = new Map<string, EnmEvent[]>();
      events.forEach(event => {
        const dateKey = `${event.year}${event.month.toString().padStart(2, '0')}${event.day.toString().padStart(2, '0')}`
        if (!enmEventsGroupedByDate.has(dateKey)) enmEventsGroupedByDate.set(dateKey, []);
        enmEventsGroupedByDate.get(dateKey)!.push(event);
      });
      return enmEventsGroupedByDate;
    }),
  );

  constructor(private enmEventService: EnmEventService) { }

  ngOnInit(): void {}

  onEnmEventListSelection(id: number | undefined) { this.enmEventService.updateEnmEventIdSpotlight(id!); }

}

