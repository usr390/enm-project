import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppState } from './state/app.state';
import * as AuthSelectors from './state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class ArtistDirectoryGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Guard activated!');
    return this.store.select(AuthSelectors.selectUser).pipe(
      take(1),
      map(user => {
        if (!user || !user.plus) {
          return true;
        }
        return true;
      })
    );
  }
}
