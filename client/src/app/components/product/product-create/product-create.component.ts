import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    codigo: null,
    //name: '',
    //price: null
    tipo: '',
    descricao: '',
    nomeVendedor: '',
    preco: null,
    imagem1: null,
    imagem2: null,
    imagem3: null,
    dataDeCadastro: null,
  }

  constructor(private productService: ProductService,
      private router: Router) { }

  ngOnInit(): void { 
    
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Imóvel cadastrado!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products']) 
  }
}
