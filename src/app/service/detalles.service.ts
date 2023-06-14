import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class DetallesService {
  idReporte: any;
  idSolucion: any;

  user = localStorage.getItem('id');
  constructor(private http: HttpClient) { }

  // ==============================================================
  // CONSULTA TODOS LOS SERVICIOS
  // ==============================================================
  consultServis() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?user=' + this.user + '&getAllServicios')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
  setidReporte(value: number) {
    this.idReporte = value;
  }
  setidSolucion(value: number) {
    this.idSolucion = value;
  }
    // ==============================================================
  // CONSULTA UNO DE LOS SERVICIOS
  // ==============================================================
  consultarReporte() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + this.idReporte + '&getOneServicios')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
   // ==============================================================
  // CONSULTA UNO DE LAS SOLUCIONES
  // ==============================================================
  consultarSolucion() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + this.idSolucion + '&getOneSolucion')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
  // ==============================================================
  // CONSULTA ALBUM  DE SOLUCION POR USUARIO
  // ==============================================================
  consultarSolucionUrl() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idSolucion=' + this.idSolucion + '&getOneSolucionFotos')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
  consultarReporteUrl() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + this.idReporte + '&getOneServiciosFotos')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
  // ==============================================================
  // CONSULTA TODOS LOS SERVICIOS DE SOLUCION
  // ==============================================================
  detalleSolcion() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?user=' + this.user + '&getAllSolucion')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
}
