import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DateTime } from "luxon";

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

  onSubmit() { 
    if (this.enmEventAddForm.valid) { this.addDateTimeToForm(); this.dropHelperControls(); this.router.navigate(['/add-event/price']); } 
  }

  goBack() { 
    this.enmEventAddForm.removeControl('startTime');
    this.enmEventAddForm.removeControl('endTime');
    this.router.navigate(['/add-event/date']); 
  }

  cancelForm() { this.router.navigate(['/']); }

  // utility
  addDateTimeToForm() {  
    this.enmEventAddForm.setControl('dateTime', this.fb.control(DateTime.fromObject({ 
      year:   this.enmEventAddForm.get('year')!.value, 
      month:  this.enmEventAddForm.get('month')!.value, 
      day:    this.enmEventAddForm.get('day')!.value, 
      hour:   Math.floor(this.enmEventAddForm.get('startTime')!.value / 100), 
      minute: this.enmEventAddForm.get('startTime')!.value % 100 
    }).toUTC().toISO()));
  }

  dropHelperControls() {
    // controls used to build 'dateTime' property. can be dropped after dateTime is created
    this.enmEventAddForm.removeControl('startTime');
    this.enmEventAddForm.removeControl('endTime');
    this.enmEventAddForm.removeControl('day');
    this.enmEventAddForm.removeControl('month');
    this.enmEventAddForm.removeControl('year');
  }
}
