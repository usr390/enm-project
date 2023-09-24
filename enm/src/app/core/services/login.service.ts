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
export class LoginService {

  public userLoginForm: FormGroup = this.fb.group({});

  user = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  postLogin() {
    this.http.post(BASE_URL, this.userLoginForm.value)
    .subscribe({
      next: _ => { 
        this.user = this.userLoginForm.value.username; 
        this.router.navigate(['/']);
      },
      error: error => console.log(error),
    });
  }

  login(username: string, password: string) {
    return this.http.post<LogInSuccessResponse>(BASE_URL, { username, password });
  }
}
