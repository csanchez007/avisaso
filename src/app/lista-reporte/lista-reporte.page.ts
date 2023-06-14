import { Component, OnInit } from '@angular/core';
import { DetallesService } from '../service/detalles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-reporte',
  templateUrl: './lista-reporte.page.html',
  styleUrls: ['./lista-reporte.page.scss'],
})
export class ListaReportePage implements OnInit {

  public detalles:any;
  constructor(private detalle: DetallesService, private router: Router) { }

  ngOnInit() {
    this.detalle.consultServis()
      .then(
        async data => {
          this.detalles = data;
        });
  }
  EditarLista(id: number) {
    this.detalle.setidReporte(id);
    this.router.navigate(['./detalle-por-reporte']);
  }
  irAlHome() {
    this.router.navigate(['./home']);
  }
}
