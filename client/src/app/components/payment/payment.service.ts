import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payment } from "./payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  urlCerta = "http://localhost:3001/api/pagamento"
  baseUrl = "http://localhost:3001/pagamentoComissionado";
  baseUrl2 = "http://localhost:3001/pagamentoContratado";

  constructor(private http: HttpClient) { }

  read(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl)
  }

  read2(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl2)
  }

  readData(periodo: any, creci: any): Observable<Payment[]> {
    const url = `${this.urlCerta}/${periodo}/${creci}`;
    return this.http.get<Payment[]>(url).pipe(
      map((obj) => obj )
    );  
  }
}
