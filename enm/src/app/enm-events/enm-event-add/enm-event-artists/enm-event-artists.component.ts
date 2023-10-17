import { Component, ElementRef, ViewChildren, QueryList, ViewChild, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-enm-event-artists',
  templateUrl: './enm-event-artists.component.html',
  styleUrls: ['./enm-event-artists.component.less']
})
export class EnmEventArtistsComponent {
  
  @ViewChildren('artistInput') artistInputs!: QueryList<ElementRef>;

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddFormValuesActionStream$ = this.enmEventAddMultipageFormService.enmEventAddMultipageForm.valueChanges.pipe(
    tap(value => { this.store$.dispatch(FormActions.updateForm({ formValue: value })) }),
  );

  selectedArtists$ = this.store$.select(fromForm.selectArtists);

  constructor(private store$: Store, private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() { 
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() {
    if (this.enmEventAddForm.valid) {
      this.trimArtistArrayElements();
      this.enmEventAddMultipageFormService.postEnmEvent();
      this.router.navigate(['/']);
    }
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/cover']); 
  }
  
  //#region utility
  get artistsArray() { return this.enmEventAddForm.get('artists') as FormArray; }
  setUpLocalFormControls() {
    this.enmEventAddForm.setControl('artists', this.fb.array([ this.createArtistInputField() ])) 
  }
  tearDownLocalFormControls() {
  }
  createArtistInputField() { return this.fb.control('', Validators.required); }
  removeArtistInputField(index: number) { 
    // counterpart of 'addArtistInputField'
    this.artistsArray.removeAt(index);
  }
  canAddArtistInputField() {
    /* summary
      used by template to enable 'add artist' button
      returns true when:
      - less than 50 input fields
      - the previous input field has been filled
    */
    const previousArtistInputField = this.artistsArray.controls[this.artistsArray.controls.length - 1];
    return this.artistsArray.controls.length < 50 && previousArtistInputField.value;
  }
  addArtistInputField() {
    // counterpart of 'removeArtistInputField'
    this.artistsArray.push(this.createArtistInputField());
    setTimeout(() => this.artistInputs.last.nativeElement.focus(), 0);
  }
  trimArtistArrayElements() {
    this.artistsArray.controls.forEach((control) => {
      control.setValue(control.value.trim());
    });
  }
  initializeFormControls() {
    // only initializes if there's artist-related state in NgRx store
    this.selectedArtists$.pipe(take(1)).subscribe(artists => {
      if (artists) {
        // first, reset the artistsArray so it's empty
        while (this.artistsArray.length !== 0) {
          this.artistsArray.removeAt(0);
        }

        // then, populate artistsArray with controls for each artist
        artists.forEach(artist => {
          this.artistsArray.push(this.createArtistInputField());
        });

        // finally, set the values
        this.artistsArray.setValue(artists);
      }
    });
  }
  //#endregion
}

