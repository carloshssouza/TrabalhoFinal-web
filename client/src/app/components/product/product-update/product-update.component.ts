import { Product } from "./../product.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get("codigo");
    this.productService.readById(codigo).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(): void {
    const codigo = this.route.snapshot.paramMap.get("codigo");

    this.productService.update(this.product, codigo).subscribe(() => {
      this.productService.showMessage("Imovel atualizado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
