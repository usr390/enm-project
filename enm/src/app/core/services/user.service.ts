import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RefreshUserSuccessResponse } from 'src/app/models/refreshUserSuccessResponse';
import { Observable, take } from 'rxjs';

const BASE_URL = environment.api;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string){
    return this.http.get<RefreshUserSuccessResponse>(`${BASE_URL}/getUser/${username}`);
  }

  getNextInvoice(id: string){
    return this.http.get<any>(`${BASE_URL}/next-invoice-date/${id}`);
  }

  cancelSubscription(id: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/cancel-subscription/${id}`, {});
  }
  
}
