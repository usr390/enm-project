import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-date',
  templateUrl: './enm-event-date.component.html',
  styleUrls: ['./enm-event-date.component.less']
})
export class EnmEventDateComponent {
  /* summary
    adds date information to an event.
    previous: EnmEventAddAddressComponent, next: EnmEventAddTimeComponent
  */
 
  dateForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddMultipageForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.dateForm.setControl('day', this.fb.control('', [Validators.required, Validators.min(1), Validators.max(31)]));
    this.dateForm.setControl('month', this.fb.control('', [Validators.required, Validators.min(1), Validators.max(12)]));
    this.dateForm.setControl('year', this.fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]));
  }

  onSubmit(): void { 
    if (this.dateForm.valid) {
      this.enmEventAddMultipageFormService.postEnmEvent();
      this.router.navigate(['/add-event/time']);
    }
  }

  goBack(): void { 
    this.dateForm.removeControl('day');
    this.dateForm.removeControl('month');
    this.dateForm.removeControl('year');
    this.router.navigate(['/add-event/address']); 
  }

  cancelForm() { 
    this.router.navigate(['/']); 
  }

}
