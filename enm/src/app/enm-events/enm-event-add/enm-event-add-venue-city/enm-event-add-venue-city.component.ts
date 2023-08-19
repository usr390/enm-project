import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnmEventAddMultipageFormService } from 'src/app/core/services/enm-event-add-multipage-form.service';

@Component({
  selector: 'app-enm-event-add-venue-city',
  templateUrl: './enm-event-add-venue-city.component.html',
  styleUrls: ['./enm-event-add-venue-city.component.less']
})
export class EnmEventAddVenueCityComponent {

  enmEventAddVenueForm: FormGroup = this.enmEventAddMultipageFormService.enmEventAddVenueForm;

  constructor(private enmEventAddMultipageFormService: EnmEventAddMultipageFormService, private router: Router, private fb: FormBuilder){}

  ngOnInit() {
    this.enmEventAddVenueForm.setControl('city', this.fb.control('', Validators.required));
  }

  onSubmit() { 
    if (this.enmEventAddVenueForm.valid) { 
      this.router.navigate(['/add-event/add-venue-address']); 
    } 
  }

  goBack() { 
    this.enmEventAddVenueForm.removeControl('city');
    this.router.navigate(['/add-event/add-venue-name']); 
  }

  cancelForm() { 
    this.enmEventAddVenueForm.removeControl('city');
    this.router.navigate(['/']); 
  }

}
