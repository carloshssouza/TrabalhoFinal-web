import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators"; 

@Injectable({
  providedIn: "root",
})
export class ProductService {
  //baseUrl = "http://localhost:3001/products";
  //UrlCreate = "http://localhost:3001/products";
  UrlCreate = "http://localhost:3001/api/imoveis"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.UrlCreate, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.UrlCreate).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(codigo: string): Observable<Product> {
    const url = `${this.UrlCreate}/${codigo}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product, codigo: string): Observable<Product> {
    const url = `${this.UrlCreate}/${codigo}`;
    const {dataDeCadastro, descricao, imagem1, imagem2, imagem3, nomeVendedor, preco} = product;
      const obj = {
        dataDeCadastro,
        descricao, 
        imagem1, 
        imagem2, 
        imagem3, 
        nomeVendedor, 
        preco
      }
    console.log(product);
    return this.http.patch<Product>(url, obj).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(codigo: string): Observable<Product> {
    const url = `${this.UrlCreate}/${codigo}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),  
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
