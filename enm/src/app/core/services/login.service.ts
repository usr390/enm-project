import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.api + '/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userLoginForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(BASE_URL).subscribe();
  }
}
