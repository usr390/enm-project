import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInSuccessResponse } from 'src/app/models/logInSuccessResponse.model';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.api + '/login';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  public userLogInForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  logIn(username: string, password: string) {
    return this.http.post<LogInSuccessResponse>(BASE_URL, { username, password });
  }
}
