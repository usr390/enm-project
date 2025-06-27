import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { environment } from 'src/environments/environment';
import * as AuthSelectors from './../../state/auth/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class ArtistDirectoryService {

  constructor(private http: HttpClient, private store$: Store) { }

  user$ = this.store$.select(AuthSelectors.selectUser).pipe(take(1));

  getArtistDirectory(): Observable<Artist[]> {
    return this.user$.pipe(
      switchMap(user => {
        const ENDPOINT = environment.api + '/artistDirectoryTrans';
        let params = new HttpParams();
        if (user) {
          params = params.append('username', user.username);
        }
        return this.http.get<Artist[]>(ENDPOINT, { params });
      })
    );
  }
}
