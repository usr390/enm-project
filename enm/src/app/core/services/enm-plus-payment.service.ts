import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NullableUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.api;

interface StripeCheckoutSession {
  clientSecret: string
}

@Injectable({
  providedIn: 'root'
})
export class EnmPlusPaymentService {

  constructor(private http: HttpClient) { }

  checkoutSession$(userid: string) {
    return this.http.post<StripeCheckoutSession>(BASE_URL + '/create-checkout-session', { userid })
  }

  checkoutSessionToAppeaseEffect(userid: string): Observable<StripeCheckoutSession> {
    return this.http.post<StripeCheckoutSession>(BASE_URL + '/create-checkout-session', { userid })
  }
  

  checkoutSessionTest$(userid: string) {
    return this.http.post<StripeCheckoutSession>(BASE_URL + '/create-checkout-session-test', { userid })
  }

  furthestEventDate$ = this.http.get<string>(BASE_URL + '/getFurthestEventDateTime')
  
  defunctArtistsCount$ = this.http.get<string>(BASE_URL + '/rgv-defunct-artists-count')

  plusifyUser(user: NullableUser) {
    const url = `${BASE_URL}/user/${user?.id}/plusify`;
    return this.http.put<NullableUser>(url, {});
  }

}
