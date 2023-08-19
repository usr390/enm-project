import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-add-venue-name',
  templateUrl: './enm-event-add-venue-name.component.html',
  styleUrls: ['./enm-event-add-venue-name.component.less']
})
export class EnmEventAddVenueNameComponent {

  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private router: Router, private fb: FormBuilder){}

  ngOnInit() {
    this.enmEventAddVenueForm.setControl('name', this.fb.control('', Validators.required));
  }

  onSubmit() { 
    if (this.enmEventAddVenueForm.valid) { this.router.navigate(['/add-event/date']); } 
  }

  goBack() { 
    this.router.navigate(['/add-event/venue']); 
  }

  cancelForm() { 
    this.enmEventAddVenueForm.removeControl('name');
    this.router.navigate(['/']); 
  }

}
