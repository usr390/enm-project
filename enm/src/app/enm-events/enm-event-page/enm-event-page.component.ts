// angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// 3rd party imports
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
// enm imports
import { AppState } from 'src/app/state/app.state';
import * as EnmEventsSelectors from './../../state/enmEvents/enmEvents.selectors';

@Component({
  selector: 'app-enm-event-page',
  templateUrl: './enm-event-page.component.html',
  styleUrls: ['./enm-event-page.component.less']
})
export class EnmEventPageComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    private router: Router
  ) { }

  enmEvent$ = combineLatest([this.store$.select(EnmEventsSelectors.selectAll), this.store$.select(EnmEventsSelectors.selectSelectedEventId)]).pipe(
    map(([enmEvents, spotlightEnmEventId]) => enmEvents.filter(enmEvent => enmEvent._id === spotlightEnmEventId)[0]),
  );

  ngOnInit(): void { }

  goBack() {
    this.router.navigate(['/']); 
  }

}

