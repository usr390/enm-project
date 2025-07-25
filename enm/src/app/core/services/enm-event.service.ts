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

  getEnmEventList(): Observable<EnmEvent[]> {
    return this.user$.pipe(
      switchMap(user => {
        const ENDPOINT = environment.api + '/enmEventsTrans';
        let params = new HttpParams();
        if (user) {
          params = params.append('username', user.username);
        }
        return this.http.get<EnmEvent[]>(ENDPOINT, { params });
      })
    );
  }
  

}

