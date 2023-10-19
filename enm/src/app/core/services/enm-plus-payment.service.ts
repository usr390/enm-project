import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.api + '/create-checkout-session';


@Injectable({
  providedIn: 'root'
})
export class EnmPlusPaymentService {

  checkoutSession$ = this.http.post(BASE_URL, {})

  constructor(private http: HttpClient) { }
}
