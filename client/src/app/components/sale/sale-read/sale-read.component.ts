import { Component, OnInit } from '@angular/core';
import { Sale } from '../sale.model';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sale-read',
  templateUrl: './sale-read.component.html',
  styleUrls: ['./sale-read.component.css']
})
export class SaleReadComponent implements OnInit {

  sale: Sale[]
  teste: string
  displayedColumns = ['codigo', 'creci', 'valorVenda', 'comprador', 'dataVenda']

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.saleService.read().subscribe(sale => {
      this.sale = sale
    })
  }

}
