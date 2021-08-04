import { Component, OnInit } from '@angular/core';
import { Brokers } from '../../brokers/brokers.model';
import { BrokersService } from '../../brokers/brokers.service';
import { Payment } from '../payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-read',
  templateUrl: './payment-read.component.html',
  styleUrls: ['./payment-read.component.css']
})
export class PaymentReadComponent implements OnInit {

  payment: Payment[]
  payment2: Payment[]
  tipoCorretor: string
  brokers: Brokers[]
  brokers2: Brokers[]
  displayedColumns = ['nome', 'tipo', 'total_pagar', 'data']
  periodo: []
  creci: []

  paymentBroker: any

  constructor(private paymentService: PaymentService, private brokersService: BrokersService) { }

  ngOnInit(): void {
    /*
    this.paymentService.read().subscribe(payment => { 
      this.payment = payment
    })
    
    this.brokersService.read().subscribe(broker => {
      this.brokers = broker
    })

    this.paymentService.read2().subscribe(payment => { 
      this.payment2 = payment
    })
    
    this.brokersService.read2().subscribe(broker => {
      this.brokers2 = broker
    })
    */
  }

  getReadData(): void {
    this.paymentService.readData(this.periodo, this.creci).subscribe(payment => {
      this.paymentBroker = new Array(payment)
      // console.log(this.data) 
    })
  }
}
