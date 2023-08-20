import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-price-of-entry',
  templateUrl: './enm-event-price-of-entry.component.html',
  styleUrls: ['./enm-event-price-of-entry.component.less']
})
export class EnmEventPriceOfEntryComponent {
  /* summary
    adds pricing information to an event.
    previous: EnmEventListTimeComponent, next: EnmEventAddArtistsComponent
  */

  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddForm.setControl('priceOfEntry', this.fb.control('', [Validators.required]));
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) { this.router.navigate(['/add-event/artists']); }
  }

  goBack() { 
    this.nullifyLocalControls();
    this.router.navigate(['/add-event/time']); 
  }

  cancelForm() { 
    this.nullifyExistingControls();
    this.router.navigate(['/']); 
  }

  //#region utility
  nullifyLocalControls() {
    this.enmEventAddForm.removeControl('priceOfEntry');
  }
  nullifyExistingControls() {
    this.enmEventAddForm.removeControl('priceOfEntry');
    this.enmEventAddForm.setControl('startTime', this.fb.control(new Date(0, 0, 0, 0, 0), [Validators.required]));
    this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
    this.enmEventAddForm.removeControl('venue');
    this.enmEventAddForm.removeControl('tags');
  }
  //#endregion
}
