import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class CombustibleService {

  idCombustible: any;
  user = localStorage.getItem('usuario');

  constructor(private http: HttpClient) { }

    // ==============================================================
  // REGISTRO DE REPORTES
  // ==============================================================
  detalleCombustibleAdd(datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/combustible.php?addCombustible', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );
  }
  // ==============================================================
  // REGISTRO DE SOLUCION FOTOS
  // ==============================================================
  detalleCombustibleAddFoto() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/combustible.php?rut=' + localStorage.getItem('usuario') + '&consultaComFoto')
          .subscribe(
            data => {
              resolve(data);
              // console.log(data);

            },
            err => {
              console.log(err);
            }
          );
      }
    );

  }
    // ==============================================================
  // REGISTRO DE IMAGEN  REPORTES SOLUCION
  // ==============================================================
  addImageCombustible(datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/combustible.php?addFotoCombustible', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );
  }

  setidCombustible(value:number) {
    this.idCombustible = value;
  }

  // ==============================================================
  // CONSULTA TODOS LA LISTA DE COMBUSTIBLE
  // ==============================================================
  detalleCombustible() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/combustible.php?user=' + this.user + '&getAllCombustible')
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
  consultarAlbumCombustible() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/combustible.php?idReporte=' + this.idCombustible + '&getOneCombustible')
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
  // CONSULTA ALBUM  DE COMBUSTIBLE POR USUARIO
  // ==============================================================
  consultarCombustibleUrl() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/combustible.php?idReporte=' + this.idCombustible + '&getOneCombustibleFotos')
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
