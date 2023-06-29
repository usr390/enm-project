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
    if (this.enmEventAddForm.valid) { this.enmEventAddMultipageFormService.postEnmEvent(); this.router.navigate(['/add-event/artists']); }
  }

  goBack() { 
    this.enmEventAddForm.removeControl('priceOfEntry');
    this.router.navigate(['/add-event/time']); 
  }

  cancelForm() { this.router.navigate(['/']); }
}
