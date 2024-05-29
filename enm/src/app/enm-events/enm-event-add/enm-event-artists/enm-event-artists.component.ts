// angular imports
import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party imports
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
// enm imports
import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-enm-event-artists',
  templateUrl: './enm-event-artists.component.html',
  styleUrls: ['./enm-event-artists.component.less']
})
export class EnmEventArtistsComponent {

  constructor(
    private fb: FormBuilder, // angular                                                  
    private router: Router, // angular
    private store$: Store, // 3rd party
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService // enm
  ) { }

  @ViewChildren('artistInput') artistInputs!: QueryList<ElementRef>;
  
  artists: any[] | undefined; // the form array
  selectedArtists$ = this.store$.select(fromForm.selectArtists); // for repopulating input fields after navigating away and back
  filteredArtistsAutoCompleteSuggestions!: any[];

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddFormValuesActionStream$ = this.enmEventAddMultipageFormService.enmEventAddMultipageForm.valueChanges.pipe(
    tap(value => { this.store$.dispatch(FormActions.updateForm({ formValue: value })) }),
  );

  ngOnInit() { 
    this.initializeArtistsAutoCompleteSuggestions();
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() {
    if (this.enmEventAddForm.valid) {
      this.enmEventAddMultipageFormService.postEnmEvent();
      this.router.navigate(['/events'], { replaceUrl: true });
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
  createArtistInputField() { return this.fb.control([]); }
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
  initializeArtistsAutoCompleteSuggestions() {
    this.enmEventAddMultipageFormService.getArtists().then((artists) => { this.artists = artists; });
  }
  filterArtists(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query.toLowerCase();

    const removeInitialThe = (str: any) => str.toLowerCase().startsWith('the ') ? str.substring(4) : str;

    for (let i = 0; i < (this.artists as any[]).length; i++) {
      let artist = (this.artists as any[])[i];
      let artistName = artist.name.toLowerCase();
      let modifiedArtistName = removeInitialThe(artistName);

      if (artistName.startsWith(query) || modifiedArtistName.startsWith(query)) {
        filtered.push(artist);
      }
    }
    this.filteredArtistsAutoCompleteSuggestions = filtered;
  }
  //#endregion
}

