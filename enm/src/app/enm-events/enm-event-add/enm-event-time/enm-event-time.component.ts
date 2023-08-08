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
    previous: EnmEventListDateComponent, next: EnmEventPriceOfEntryComponent
  */    
 
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  defaultTime = new Date(0, 0, 0, 0, 0);

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddForm.setControl('startTime', this.fb.control('', [Validators.required]));
  }

  onSubmit() { 
    if (this.enmEventAddForm.valid) { this.addDateTimeToForm(); this.dropHelperControls(); this.router.navigate(['/add-event/price']); } 
  }

  goBack() { 
    // .setControl as workaround to erroring .removeControl
    this.enmEventAddForm.setControl('startTime', this.fb.control(this.defaultTime, [Validators.required]));
    this.router.navigate(['/add-event/date']); 
  }

  cancelForm() { this.router.navigate(['/']); }

  // utility
  addDateTimeToForm() { 
    let date = DateTime.fromJSDate(this.enmEventAddForm.get('date')!.value)
    let time = DateTime.fromJSDate(this.enmEventAddForm.get('startTime')!.value)
    this.enmEventAddForm.setControl('dateTime', this.fb.control(date.set({ 
      hour: time.hour, 
      minute: time.minute 
    }).toUTC().toISO()));
  }

  dropHelperControls() {
    // controls used to build 'dateTime' property. can be reset to default values after dateTime is created
    // .setControl as workaround to erroring .removeControl
    this.enmEventAddForm.setControl('startTime', this.fb.control(this.defaultTime, [Validators.required]));
  }
}
