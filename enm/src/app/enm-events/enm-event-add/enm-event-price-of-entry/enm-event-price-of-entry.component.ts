import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enm-event-price-of-entry',
  templateUrl: './enm-event-price-of-entry.component.html',
  styleUrls: ['./enm-event-price-of-entry.component.less']
})
export class EnmEventPriceOfEntryComponent {
  priceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.priceForm = this.formBuilder.group({
      price: ['', [Validators.required]],
    });
  }

  cancelForm() { this.router.navigate(['/']); }
  goBack(): void { this.router.navigate(['/add-event/time']); }
  onSubmit(): void { if (this.priceForm.valid) console.log(this.priceForm.value); }

}
