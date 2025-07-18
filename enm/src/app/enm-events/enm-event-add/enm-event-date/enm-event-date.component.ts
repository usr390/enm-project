// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd party
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
// enm
import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';
import * as FormActions from '../../../state/form/form.actions';
import * as fromForm from './../../../state/form/form.reducer';


@Component({
  selector: 'app-enm-event-date',
  templateUrl: './enm-event-date.component.html',
  styleUrls: ['./enm-event-date.component.less']
})
export class EnmEventDateComponent {
  /* summary
    adds date information to an event.
    previous: EnmEventVenueComponent, next: EnmEventTimeComponent
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
  
  today: Date = new Date();
  selectedDate$ = this.store$.select(fromForm.selectDate);

  ngOnInit() {
    this.setUpLocalFormControls();
    this.initializeFormControls();
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) this.router.navigate(['/add-event/time']); 
  }

  goBack() { 
    this.tearDownLocalFormControls();
    this.router.navigate(['/add-event/promoter']); 
  }

  cancelForm() { 
    this.tearDownExistingFormControls();
    this.router.navigate(['/']); 
  }

  //#region utility
    setUpLocalFormControls() {
      this.enmEventAddForm.setControl('date', this.fb.control('', [Validators.required]));
    }
    tearDownLocalFormControls() {
    }
    tearDownExistingFormControls() {
      this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
      this.enmEventAddForm.removeControl('venue');
      this.enmEventAddForm.removeControl('tags');
    }
    initializeFormControls() {
      // only initializes if there's date-related state in NgRx store
      this.selectedDate$.pipe(take(1)).subscribe(date => {
        this.enmEventAddForm.get('date')?.setValue(date)
      });
    }
  //#endregion
}
