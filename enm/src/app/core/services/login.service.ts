// angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// enm imports
import { LogInSuccessResponse } from 'src/app/models/logInSuccessResponse.model';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.api + '/login';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  public userLogInForm: FormGroup = this.fb.group({});

  logIn(username: string, password: string) {
    return this.http.post<LogInSuccessResponse>(BASE_URL, { username, password });
  }
}
