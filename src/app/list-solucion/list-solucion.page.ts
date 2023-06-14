import { Component, OnInit } from '@angular/core';
import { DetallesService } from '../service/detalles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-solucion',
  templateUrl: './list-solucion.page.html',
  styleUrls: ['./list-solucion.page.scss'],
})
export class ListSolucionPage implements OnInit {
  detalles: any;
  constructor(private detalle: DetallesService, private router: Router) { }

  ngOnInit() {
    this.detalle.detalleSolcion()
    .then(
      async data => {
        console.log(data);
        this.detalles = data;
      });
  }
  EditarLista(id: number) {
    this.detalle.setidSolucion(id);
    this.router.navigate(['.//de-solucion']);
  }
  irAlHome() {
    this.router.navigate(['./home']);
  }
}
