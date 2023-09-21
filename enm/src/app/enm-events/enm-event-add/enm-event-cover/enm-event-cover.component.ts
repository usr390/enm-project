import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from '../../../core/services/enm-event-add-multipage-form.service';

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

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.setUpLocalFormControls();
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
    this.enmEventAddForm.setControl('cover', this.fb.control('', [Validators.required]));
  }
  tearDownLocalFormControls() {
    this.enmEventAddForm.removeControl('cover');
  }
  tearDownExistingFormControls() {
    this.enmEventAddForm.removeControl('cover');
    this.enmEventAddForm.setControl('startTime', this.fb.control(new Date(0, 0, 0, 0, 0), [Validators.required]));
    this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  processCover() {
    let cover = this.enmEventAddForm.get('cover')?.value;
    let coverWithoutCurrencySymbol = cover.slice(1, cover.length)
    let coverAsNumber = parseInt(coverWithoutCurrencySymbol);
    this.enmEventAddForm.get('cover')?.patchValue(coverAsNumber);
  }
  //#endregion
}
