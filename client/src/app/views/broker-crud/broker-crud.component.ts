import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-broker-crud',
  templateUrl: './broker-crud.component.html',
  styleUrls: ['./broker-crud.component.css']
})
export class BrokerCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToBrokerCreate(): void {
    this.router.navigate(['/brokers/create']);
  }

}
