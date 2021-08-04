import { Component, OnInit } from '@angular/core';
import { BrokersService } from '../brokers.service';
import { Brokers } from './../brokers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-create',
  templateUrl: './broker-create.component.html',
  styleUrls: ['./broker-create.component.css']
})
export class BrokerCreateComponent implements OnInit {

  brokers: Brokers = { 
    nomeCorretor: '',
    creci: '',
    tipo: '',
    salario: null,
    dataAdmissao: null,
    percentualComissao: null
  }

  constructor(private brokersService: BrokersService, 
    private router: Router) { }

  ngOnInit(): void { 
  }

  createBroker(): void {
    this.brokersService.create(this.brokers).subscribe(() => {
      this.brokersService.showMessage('Corretor Cadastrado!')
      this.router.navigate(['/brokers'])
    })
  }

  cancel(): void {
    this.router.navigate(['/brokers'])
  }
}
