import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Brokers } from "./brokers.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class BrokersService {
  baseUrl = "http://localhost:3001/brokers";
  urlContratado = "http://localhost:3001/api/corretorContratado";
  urlComissionado = "http://localhost:3001/api/corretorComissionado";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  readByCreci(creci: string): Observable<Brokers> {
    const url = `${this.urlComissionado}/${creci}`;
    return this.http.get<Brokers>(url).pipe(
      map((obj) => obj)
    );
  }

  create(brokers: Brokers): Observable<Brokers> {
    console.log(brokers) 
    if(brokers.tipo === "Comissionado") {
      /*
      const {creci, nomeCorretor, tipo, percentualComissao} = brokers;
      const obj = {
        creci, nomeCorretor, tipo, percentualComissao 
      }
      console.log(obj)
      */
      return this.http.post<Brokers>(this.urlComissionado, brokers)
    } else {
      /*
      const {creci, nomeCorretor, tipo, salario, dataAdmissao} = brokers;
      const obj = {
        creci, nomeCorretor, tipo, salario, dataAdmissao
      }
      console.log(obj)
      */
      return this.http.post<Brokers>(this.urlContratado, brokers)
    }
  }

  read(): Observable<Brokers[]> {
    return this.http.get<Brokers[]>(this.urlComissionado)
  }

  read2(): Observable<Brokers[]> {
    return this.http.get<Brokers[]>(this.urlContratado)
  }

  update(brokers: Brokers, creci: string): Observable<Brokers> {
    if(brokers.tipo === "Comissionado") {
      const url = `${this.urlComissionado}/${creci}`;
      const {dataAdmissao, percentualComissao} = brokers;
      const obj = {
        dataAdmissao,
        percentualComissao 
      }
      return this.http.patch<Brokers>(url, obj).pipe(
        map((obj) => obj),
      );
    } else {
      const {dataAdmissao, salario} = brokers;
      const obj = {
        dataAdmissao,
        salario
      }
      const url = `${this.urlContratado}/${creci}`;
      return this.http.patch<Brokers>(url, obj).pipe(
        map((obj) => obj),
      );
    }
  } 

  update2(brokers: Brokers, creci: string): Observable<Brokers> {
    console.log(brokers)
    const url = `${this.urlComissionado}/${creci}`;
    return this.http.patch<Brokers>(url, brokers).pipe(
      map((obj) => obj), 
    );
  }
}  
