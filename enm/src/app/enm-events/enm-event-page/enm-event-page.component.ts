import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { EnmEventService } from './../../core/services/enm-event.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as EnmEventsSelectors from './../../state/enmEvents/enmEvents.selectors';
import { Router } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';


@Component({
  selector: 'app-enm-event-page',
  templateUrl: './enm-event-page.component.html',
  styleUrls: ['./enm-event-page.component.less']
})
export class EnmEventPageComponent implements OnInit {

  enmEvent$ = combineLatest([this.store$.select(EnmEventsSelectors.selectAll), this.store$.select(EnmEventsSelectors.selectSelectedEventId)]).pipe(
    map(([enmEvents, spotlightEnmEventId]) => enmEvents.filter(enmEvent => enmEvent._id === spotlightEnmEventId)[0]),
  );

  constructor(private store$: Store<AppState>, private enmEventService: EnmEventService, private router: Router) { }

  ngOnInit(): void { }

  goBack() {
    this.router.navigate(['/']); 
  }


}

