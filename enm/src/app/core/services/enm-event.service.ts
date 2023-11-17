import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnmEvent } from './../../models/enm-event.model';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, shareReplay, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from 'src/app/state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class EnmEventService {

  enmEvents$ = this.store$.select(AuthSelectors.selectUser).pipe(
    switchMap(user => {
      const ENDPOINT = user?.plus ? environment.api + '/enmEvents' : environment.api + '/enmEventsRegular';
      return this.http.get<EnmEvent[]>(ENDPOINT).pipe(shareReplay(1));
    })
  );

  constructor(private http: HttpClient, private store$: Store) { }

}

