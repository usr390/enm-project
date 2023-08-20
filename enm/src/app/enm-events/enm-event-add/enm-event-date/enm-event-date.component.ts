import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnmEventAddMultipageFormService } from './../../../core/services/enm-event-add-multipage-form.service';

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
 
  enmEventAddForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;
  today: Date = new Date();

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.enmEventAddForm.setControl('date', this.fb.control('', [Validators.required]));
  }

  onSubmit() { console.log(this.enmEventAddForm.controls); if (this.enmEventAddForm.valid) { this.router.navigate(['/add-event/time']); } }

  goBack() { 
    this.nullifyLocalControls();
    this.router.navigate(['/add-event/venue']); 
  }

  cancelForm() { 
    this.nullifyExistingControls();
    this.router.navigate(['/']); 
  }

  //#region utility
    nullifyLocalControls() {
      this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
    }
    nullifyExistingControls() {
      this.enmEventAddForm.setControl('date', this.fb.control('00/00/0000', [Validators.required]));
      this.enmEventAddForm.removeControl('venue');
      this.enmEventAddForm.removeControl('tags');
    }
  //#endregion
}
