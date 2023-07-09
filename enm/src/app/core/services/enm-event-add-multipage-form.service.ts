import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
const BASE_URL = environment.api;


@Injectable({
  providedIn: 'root'
})
export class EnmEventAddMultipageFormService {
  /* summary
    semantically, this service's name should be understood as "EnmEventAdd_MultipageFormService" and it works directly with EnmEventAddModule.
    the EnmEventAddModule (semantically, "EnmEventAdd_Module") contains components that consume this service and together they are responsible 
    for facilitating user-driven creation of EnmEvents (i.e. this is how users add their events to the website).
  */ 
   
  // initially set to an empty form group because consuming components will add their respective controls to the group as the components are initialized
  public enmEventAddMultipageForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  // in the context of the multipage form, the last page (aka last component) will call this function to deliver the form value to the API
  postEnmEvent() {
    this.http.post(BASE_URL + '/enmEventTest', this.enmEventAddMultipageForm.value)
    .subscribe({
      error: error => console.log(error),
    });
  }

  venues$ = this.http.get<any[]>(BASE_URL + '/venues').pipe();
  
}
