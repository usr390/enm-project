import { Component } from '@angular/core';
import { EnmPlusPaymentService } from 'src/app/core/services/enm-plus-payment.service';

@Component({
  selector: 'app-enm-plus-payment-screen',
  templateUrl: './enm-plus-payment-screen.component.html',
  styleUrls: ['./enm-plus-payment-screen.component.less']
})
export class EnmPlusPaymentScreenComponent {

  checkoutSession$ = this.enmPlusPaymentService.checkoutSession$;

  constructor(private enmPlusPaymentService: EnmPlusPaymentService){}

}
