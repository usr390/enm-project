import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enm-event-date',
  templateUrl: './enm-event-date.component.html',
  styleUrls: ['./enm-event-date.component.less']
})
export class EnmEventDateComponent {
  dateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.dateForm = this.formBuilder.group({
      day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]]
    });
  }

  cancelForm() { this.router.navigate(['/']); }
  goBack(): void { this.router.navigate(['/add-event/address']); }
  onSubmit(): void { if (this.dateForm.valid) console.log(this.dateForm.value); }

}
