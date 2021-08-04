import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brokers } from '../brokers.model';
import { BrokersService } from '../brokers.service';

@Component({
  selector: 'app-broker-update',
  templateUrl: './broker-update.component.html',
  styleUrls: ['./broker-update.component.css']
})
export class BrokerUpdateComponent implements OnInit {
  brokers: Brokers;

  constructor(private brokersService: BrokersService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const creci = this.route.snapshot.paramMap.get("creci");
    this.brokersService.readByCreci(creci).subscribe((broker) => {
      this.brokers = broker;
    });
  }

  updateBroker(): void {
  const creci = this.route.snapshot.paramMap.get("creci");

    this.brokersService.update(this.brokers, creci).subscribe(() => {
      this.brokersService.showMessage("Corretor atualizado com sucesso!");
      this.router.navigate(["/brokers"]);
    });
  }

  cancel(): void {
    this.router.navigate(['/brokers']);
  }
}
