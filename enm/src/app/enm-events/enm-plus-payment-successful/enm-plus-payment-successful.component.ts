import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';
import * as fromAuth from './../../state/auth/auth.reducer';
import { concatMap, map, take } from 'rxjs';


@Component({
  selector: 'app-enm-plus-payment-successful',
  templateUrl: './enm-plus-payment-successful.component.html',
  styleUrls: ['./enm-plus-payment-successful.component.less']
})
export class EnmPlusPaymentSuccessfulComponent {

  user$ = this.store$.select(fromAuth.selectUser).pipe(
    take(1), 
    map((user) => this.enmPlusPaymentService.plusifyUser(user) )
  )

  constructor(private store$: Store, private enmPlusPaymentService: EnmPlusPaymentService) {}

}
