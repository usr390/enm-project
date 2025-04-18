import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RefreshUserSuccessResponse } from 'src/app/models/refreshUserSuccessResponse';
import { Observable, take } from 'rxjs';
import { UpcomingSubscriptionRenewalDateSuccessResponse } from 'src/app/models/upcomingSubscriptionRenewalDateSuccessResponse';
import { CancelRarelygroovyPlusSubscriptionSuccessResponse } from 'src/app/models/cancelRarelygroovyPlusSubscriptionSuccessResponse';

const BASE_URL = environment.api;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string){
    return this.http.get<RefreshUserSuccessResponse>(`${BASE_URL}/getUser/${username}`);
  }

  getNextInvoice(id: string) {
    return this.http.get<UpcomingSubscriptionRenewalDateSuccessResponse>(`${BASE_URL}/payment-history/${id}`);
  }

  cancelSubscription(id: string) {
    return this.http.post<CancelRarelygroovyPlusSubscriptionSuccessResponse>(`${BASE_URL}/cancel-subscription/${id}`, {});
  }

  deleteUser(userId: string) {
    return this.http.delete<{ message: string }>(`${BASE_URL}/delete-user/${userId}`);
  }
  
}
