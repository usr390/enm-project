import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnmEvent } from './../../models/enm-event.model';
import { environment } from './../../../environments/environment';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from 'src/app/state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class EnmEventService {

  constructor(private http: HttpClient, private store$: Store) { }

  user$ = this.store$.select(AuthSelectors.selectUser).pipe(take(1));

  // getEnmEventList(): Observable<EnmEvent[]> {
  //   return this.user$.pipe(
  //     switchMap(user => {
  //       const ENDPOINT = user?.plus ? environment.api + '/enmEvents' : environment.api + '/enmEventsRegular';
  //       return this.http.get<EnmEvent[]>(ENDPOINT);
  //     })
  //   );
  // }

  getEnmEventList(): Observable<EnmEvent[]> {
    return this.user$.pipe(
      switchMap(user => {
        const ENDPOINT = environment.api + '/enmEvents';
        let params = new HttpParams();
        if (user && user.id) {
          params = params.append('userId', user.id);
        }
        return this.http.get<EnmEvent[]>(ENDPOINT, { params });
      })
    );
  }
  

}

