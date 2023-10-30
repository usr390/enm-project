import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnmEvent } from './../../models/enm-event.model';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable, shareReplay, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/auth/auth.reducer';
const BASE_URL = environment.api + '/enmEventsRegular';

@Injectable({
  providedIn: 'root'
})
export class EnmEventService {

  enmEvents$ = this.store$.select(selectUser).pipe(
    switchMap(user => {
      const ENDPOINT = user?.plus ? environment.api + '/enmEvents' : environment.api + '/enmEventsRegular';
      return this.http.get<EnmEvent[]>(ENDPOINT).pipe(shareReplay(1));
    })
  );

  constructor(private http: HttpClient, private store$: Store) { }

  updateEnmEventListFilter(criteria: string) { this.enmEventListFilterSubject.next(criteria); }
  private enmEventListFilterSubject = new BehaviorSubject<string>('');
  enmEventListFilterAction$ = this.enmEventListFilterSubject.asObservable();
  
  updateEnmEventIdSpotlight(_id: string) { this.updateEnmEventIdSpotlightSubject.next(_id); } 
  private updateEnmEventIdSpotlightSubject = new BehaviorSubject<string>('');
  updateEnmEventIdSpotlightAction$ = this.updateEnmEventIdSpotlightSubject.asObservable(); 

}

