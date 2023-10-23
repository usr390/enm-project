import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NullableUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.api + '/create-checkout-session';

interface StripeCheckoutSession {
  clientSecret: string
}

@Injectable({
  providedIn: 'root'
})
export class EnmPlusPaymentService {

  checkoutSession$ = this.http.post<StripeCheckoutSession>(BASE_URL, {})

  constructor(private http: HttpClient) { }

  plusifyUser(user: NullableUser) {
    console.log(user?.username + ' plusified!')
  }
}
