import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sales-crud',
  templateUrl: './sales-crud.component.html',
  styleUrls: ['./sales-crud.component.css']
})
export class SalesCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToSaleCreate(): void {
    this.router.navigate(['/sales/create'])
  }
}
