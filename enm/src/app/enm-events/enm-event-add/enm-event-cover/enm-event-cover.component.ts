// angular imports
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party imports
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
// enm imports
import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';

@Component({
  selector: 'app-enm-event-cover',
  templateUrl: './enm-event-cover.component.html',
  styleUrls: ['./enm-event-cover.component.less']
})
export class EnmEventCoverComponent {
  /* summary
    adds pricing information to an event.
    previous: EnmEventListTimeComponent, next: EnmEventAddArtistsComponent
  */

  constructor(
    private fb: FormBuilder, // angular
    private router: Router, // angular
    private store$: Store, // 3rd party
    private enmEventAddMultipageFormService: EnmEventAddMultipageFormService // enm
  ) {}

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  enmEventAddFormValuesActionStream$ = this.enmEventAddMultipageFormService.enmEventAddMultipageForm.valueChanges.pipe(
    tap(value => { this.store$.dispatch(FormActions.updateForm({ formValue: value })) }),
  );

  selectedCover$ = this.store$.select(fromForm.selectCover);

  ngOnInit() {
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() {
    if (this.enmEventAddForm.valid) { this.processCover(); this.router.navigate(['/add-event/artists']); }
  }

  goBack() {
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/time']);
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls() {
    this.enmEventAddForm.setControl('cover', this.fb.control(''));
  }
  tearDownLocalFormControls() {
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('cover');
    this.enmEventAddForm.setControl('startTime', this.fb.control(new Date(0, 0, 0, 0, 0), [Validators.required]));
    this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  processCover() {
    // casting basically
    let cover = this.enmEventAddForm.get('cover')?.value;
    let coverWithoutCurrencySymbol = cover.slice(1, cover.length)
    let coverAsNumber = parseInt(coverWithoutCurrencySymbol);
    this.enmEventAddForm.get('cover')?.patchValue(coverAsNumber);
  }
  initializeFormControls() {
    // only initializes if there's cover-related state in NgRx store
    this.selectedCover$.pipe(take(1)).subscribe(cover => {
      let stringifiedCover = cover?.toString();
      if (!stringifiedCover?.startsWith('$')) stringifiedCover = '$' + stringifiedCover;
      this.enmEventAddForm.get('cover')?.setValue(stringifiedCover);
    });
  }
  //#endregion
}
