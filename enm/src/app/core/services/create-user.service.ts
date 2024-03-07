// angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// enm imports
import { CreateUserSuccessResponse } from 'src/app/models/createUserSuccessResponse';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.api + '/create-user';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  public createUserForm: FormGroup = this.fb.group({});

  createUser(username: string, password: string, promoCode: string) {
    return this.http.post<CreateUserSuccessResponse>(BASE_URL, { username, password, promoCode });
  }

}
