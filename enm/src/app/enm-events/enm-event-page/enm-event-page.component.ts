import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { EnmEventService } from './../../core/services/enm-event.service';

@Component({
  selector: 'app-enm-event-page',
  templateUrl: './enm-event-page.component.html',
  styleUrls: ['./enm-event-page.component.less']
})
export class EnmEventPageComponent implements OnInit {

  enmEvent$ = combineLatest([this.enmEventService.enmEvents$, this.enmEventService.updateEnmEventIdSpotlightAction$]).pipe(
    map(([enmEvents, spotlightEnmEventId]) => enmEvents.filter(enmEvent => enmEvent.id === spotlightEnmEventId)[0]),
  );

  constructor(private enmEventService: EnmEventService) { }

  ngOnInit(): void { }

}

