import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnmEvent } from './../../models/enm-event.model';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
const BASE_URL = environment.api + '/enmEvents';

@Injectable({
  providedIn: 'root'
})
export class EnmEventService {

  enmEvents$ = this.getRecipesList(); getRecipesList(): Observable<EnmEvent[]> {
    if (this.enmEvents$) return this.enmEvents$; else return this.http.get<EnmEvent[]>(BASE_URL).pipe(shareReplay(1));
  }

  constructor(private http: HttpClient) { }

  updateEnmEventListFilter(criteria: string) { this.enmEventListFilterSubject.next(criteria); }
  private enmEventListFilterSubject = new BehaviorSubject<string>('');
  enmEventListFilterAction$ = this.enmEventListFilterSubject.asObservable();
  
  updateEnmEventIdSpotlight(id: number) { this.updateEnmEventIdSpotlightSubject.next(id); } 
  private updateEnmEventIdSpotlightSubject = new BehaviorSubject<number>(0);
  updateEnmEventIdSpotlightAction$ = this.updateEnmEventIdSpotlightSubject.asObservable(); 

}

