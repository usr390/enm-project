import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-time',
  templateUrl: './enm-event-time.component.html',
  styleUrls: ['./enm-event-time.component.less']
})
export class EnmEventTimeComponent {
  /* summary
    adds time information to an event.
    previous: EnmEventListDateComponent, next: EnmEventAddPriceComponent
  */
 
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddForm.setControl('startTime', this.fb.control('', [Validators.required]));
    this.enmEventAddForm.setControl('endTime', this.fb.control('', [Validators.required]));
  }

  onSubmit() { if (this.enmEventAddForm.valid) { this.router.navigate(['/add-event/price']); } }

  goBack() { 
    this.enmEventAddForm.removeControl('startTime');
    this.enmEventAddForm.removeControl('endTime');
    this.router.navigate(['/add-event/date']); 
  }

  cancelForm() { this.router.navigate(['/']); }
}
