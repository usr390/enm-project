// angular
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
// enm
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';


interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-enm-event-promoter',
  templateUrl: './enm-event-promoter.component.html',
  styleUrls: ['./enm-event-promoter.component.less']
})
export class EnmEventPromoterComponent {
  /* summary
    adds promoter information to an event.
    cancel: EnmEventListComponent, back: EnmEventVenueComponent, next: EnmEventDateComponent
  */

  constructor(
    private fb: FormBuilder, // angular
    private router: Router, // angular
    private store$: Store, // 3rd party
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService // enm
  ) {}

  promoters: any[] | undefined; // holds autocomplete suggestions, just for initialization
  filteredPromoters!: any[]; // holds autocomplete suggestions with respect to what the user has typed
  selectedPromoter$ = this.store$.select(fromForm.selectPromoter); // for repopulating the input field after navigating away and back from component

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddFormValuesActionStream$ = this.enmEventAddMultipageFormService.enmEventAddMultipageForm.valueChanges.pipe(
    tap(value => { this.store$.dispatch(FormActions.updateForm({ formValue: value })) }),
  );

  ngOnInit() {
    this.initializePromoterAutoCompleteSuggestions();
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) {
      this.addTags(); 
      this.router.navigate(['add-event/date']); 
    } 
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['add-event/venue']); 
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls() {
    this.enmEventAddForm.setControl('promoter', this.fb.control(''));
  }
  tearDownLocalFormControls() {
    this.enmEventAddForm.removeControl('promoter');
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
    this.enmEventAddForm.removeControl('promoter');
  }
  addTags() {
    const tagsArray = this.enmEventAddForm.get('tags') as FormArray;
    const userPromoter = this.enmEventAddForm.get('promoter')?.value;
    const autoCompleteSuggestion = 'object';

    if (typeof userPromoter === autoCompleteSuggestion) {
      const promoterName = this.enmEventAddForm.get('promoter')?.value.name;
      tagsArray.push(this.fb.control(promoterName));
    } 
    else tagsArray.push(this.fb.control(userPromoter));
  }
  initializePromoterAutoCompleteSuggestions() {
    this.enmEventAddMultipageFormService.getPromoters().then((promoters) => { this.promoters = promoters; });
  }
  filterPromoter(event: AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    
    for (let i = 0; i < (this.promoters as any[]).length; i++) {
      let promoter = (this.promoters as any[])[i];
      if (promoter.name.toLowerCase().indexOf(query.toLowerCase()) != -1) filtered.push(promoter); 
    }

    this.filteredPromoters = filtered;
  }
  initializeFormControls(){
    this.selectedPromoter$.pipe(take(1)).subscribe(promoter => {
      this.enmEventAddForm.get('promoter')?.setValue(promoter)
    });
  }
  //
}
