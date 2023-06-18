import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enm-event-time',
  templateUrl: './enm-event-time.component.html',
  styleUrls: ['./enm-event-time.component.less']
})
export class EnmEventTimeComponent {
  timeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.timeForm = this.formBuilder.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }

  cancelForm() { this.router.navigate(['/']); }
  goBack(): void { this.router.navigate(['/add-event/date']); }
  onSubmit(): void { if (this.timeForm.valid) console.log(this.timeForm.value); }

}
