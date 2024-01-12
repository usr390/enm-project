import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentScreenSkippedService {
  // used to improve user experience when navigating to Rarelygroovy+'s payment screen
  // in case user attempts to nav here, and is not signed in, this service will help
  // save that intent and redirect the user back to the payment screen after logging in or creating a new user
  paymentScreenSkipped = false;
}
