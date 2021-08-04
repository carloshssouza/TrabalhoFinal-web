import { Component, OnInit } from '@angular/core';
import { Report } from '../report.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-read',
  templateUrl: './report-read.component.html',
  styleUrls: ['./report-read.component.css']
})
export class ReportReadComponent implements OnInit {

  results: any
  dateGet: []
  report: Report[]
  yearMonth: string
  displayedColumns = ['periodo', 'faturamento', 'lucro', 'qtdImoveisVendidos', 'qtdImoveisEncalhados', 'listaFaturamentoCorretores', 'listaPagamento', 'funcionarioMes']

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    /*
    this.reportService.read().subscribe(report => { 
      this.report = report
      console.log(report)
    })
    */
  }

  getReadData(): void {
    this.reportService.readData(this.dateGet).subscribe(report => {
      this.results = new Array(report)
      // console.log(this.data) 
    })
  }
}

