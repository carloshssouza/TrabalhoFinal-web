import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brokers } from '../../brokers/brokers.model';
import { BrokersService } from '../../brokers/brokers.service';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { SaleService } from '../sale.service';
import { Sale } from './../sale.model';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {

  sale: Sale = {
    codigo: null,
    creci: '',
    valorVenda: null,
    comprador: '',
    dataVenda: null,
    imovel: null
  }

  product: Product[]
  brokers: Brokers[]
  brokers2: Brokers[]

  constructor(private saleService: SaleService, 
    private router: Router,
    private productService: ProductService,
    private brokersService: BrokersService) { }

  ngOnInit(): void {
    this.productService.read().subscribe(product => {
      this.product = product
    })

    this.brokersService.read().subscribe(broker => {
      this.brokers = broker
    }) 

    this.brokersService.read2().subscribe(broker => {
      this.brokers2 = broker
    }) 
  }

  createSale(): void {
    this.saleService.create(this.sale).subscribe(() => {
      this.saleService.showMessage('Venda Cadastrada!')
      this.router.navigate(['/sales'])
    })
  }

  cancel(): void {
    this.router.navigate(['/sales'])
  }
}
