import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Sale } from "./sale.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  //baseUrl = "http://localhost:3001/sales";
  urlCreate = "http://localhost:3001/api/vendas"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
 
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(sale: Sale): Observable<Sale> { 
    return this.http.post<Sale>(this.urlCreate, sale)
  }

  read(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.urlCreate) 
  }
}
