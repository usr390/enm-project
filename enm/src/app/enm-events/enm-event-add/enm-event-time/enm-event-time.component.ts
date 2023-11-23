// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { DateTime } from "luxon";
// enm
import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';


@Component({
  selector: 'app-enm-event-time',
  templateUrl: './enm-event-time.component.html',
  styleUrls: ['./enm-event-time.component.less']
})
export class EnmEventTimeComponent {
  /* summary
    adds time information to an event.
    previous: EnmEventListDateComponent, next: EnmEventCoverComponent
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

  defaultTime = new Date(0, 0, 0, 0, 0);

  selectedTime$ = this.store$.select(fromForm.selectTime);

  ngOnInit() {
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) { this.addDateTimeToForm(); this.router.navigate(['/add-event/cover']); } 
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/date']); 
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  setUpLocalFormControls() {
    this.enmEventAddForm.setControl('startTime', this.fb.control('', [Validators.required]));
  }
  tearDownLocalFormControls() {
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.setControl('startTime', this.fb.control(this.defaultTime, [Validators.required]));
    this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  addDateTimeToForm() { 
    let date = DateTime.fromJSDate(this.enmEventAddForm.get('date')!.value)
    let time = DateTime.fromJSDate(this.enmEventAddForm.get('startTime')!.value)
    this.enmEventAddForm.setControl('dateTime', this.fb.control(date.set({ 
      hour: time.hour, 
      minute: time.minute 
    }).toUTC().toISO()));
  }
  dropHelperControls() {
  }
  initializeFormControls() {
    // only initializes if there's time-related state in NgRx store
    this.selectedTime$.pipe(take(1)).subscribe(startTime => {
      this.enmEventAddForm.get('startTime')?.setValue(startTime)
    });
  }
  //#endregion 
}
