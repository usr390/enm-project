import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../environments/environment';

const BASE_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class EnmEventAddMultipageFormService {
  /* summary
    service name should be read "EnmEventAdd_MultipageFormService". it works alongside EnmEventAddModule.
    the EnmEventAddModule ("EnmEventAdd_Module") contains components that consume this service and together they are responsible 
    for facilitating user-driven creation of EnmEvents (i.e., this is how users add their events to the website).
  */ 

  constructor(private fb: FormBuilder, private http: HttpClient) {}
   
  // initially set to an empty form group because consuming components will add their respective controls to the group as the components are initialized
  public enmEventAddMultipageForm: FormGroup = this.fb.group({});
  public enmEventAddVenueForm: FormGroup = this.fb.group({});

  // in the context of the multipage form, the last page (aka last component) will call this function to deliver the form value to the API
  postEnmEvent() {
    this.http.post(BASE_URL + '/enmEvent', this.enmEventAddMultipageForm.value)
    .subscribe({
      error: error => console.log(error),
    });
  }

  // promise-based http request. used in EnmEventVenueComponent for autocomplete functionality
  getVenues() {
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any[]>(BASE_URL + '/venues').subscribe({
        next: (res: any) => {
          resolve(res);
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

    // promise-based http request. used in EnmEventArtistsComponent for autocomplete functionality
    getArtists() {
      const promise = new Promise<any[]>((resolve, reject) => {
        this.http.get<any[]>(BASE_URL + '/artists').subscribe({
          next: (res: any) => {
            resolve(res);
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
      });
      return promise;
    }

  /* summary
    typically the main "flow" of this multipage form goes like this: 
    venue -> date -> time -> cover -> artists -> submit. where 'venue' is a pre-existing object value from a list we maintain in our backend system.
    
    however, in cases where the venue is not yet in our system (and is therefore not presented as a 
    suggestion in EnmEventVenueComponent's autocomplete suggestion list) the multipage form's flow will look more like: 
    venue -> venue city -> venue address -> date -> time -> cover -> artists -> submit
    when submitting on 'venue address', this post api call will be triggered creating and returning an actual venue object which is what the 
    multipage form will store and use
  */
  postVenue() {
    this.http.post(BASE_URL + '/venue', this.enmEventAddVenueForm.value)
    .subscribe({
      error: error => console.log(error),
    });
  }
}
