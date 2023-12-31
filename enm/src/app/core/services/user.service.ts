import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RefreshUserSuccessResponse } from 'src/app/models/refreshUserSuccessResponse';

const BASE_URL = environment.api;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string){
    return this.http.get<RefreshUserSuccessResponse>(`${BASE_URL}/getUser/${username}`);
  }
}
