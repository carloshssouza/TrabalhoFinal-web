import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]
  teste: string
  displayedColumns = ['tipo', 'imagem1', 'descricao', 'nomeVendedor', 'preco', 'dataDeCadastro', 'action']
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void { 
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }

}
