import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  checkoutSession$ = this.http.post<StripeCheckoutSession>(BASE_URL + '/create-checkout-session', {})

  constructor(private http: HttpClient) { }

  plusifyUser(user: NullableUser) {
    const url = `${BASE_URL}/user/${user?.id}/plusify`;
    this.http.put(url, {}).subscribe({
      error: error => console.log(error),
    });
  }
}
