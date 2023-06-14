import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIS } from '../config/url.servicios';
import { Router } from '@angular/router';
import { AnyNaptrRecord } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public user!: string;
  public pass!: string;
  public id: any;
  public userFoto!: string;
  public idReporte: any;
  constructor(private http: HttpClient, private router: Router) { }
  /*VARIABLE GLOBALES*/
  setrRUTvar(value: string) {
    this.user = value;
  }

  setrRUTvarFoto(value: string) {
    this.userFoto = value;
  }

  setPassVar(value: string) {
    this.pass = value;
  }
  seIdUserVar(value: string) {
    this.id = value;
  }
  // ==============================================================
  // INICIAR SESION
  // ==============================================================
  inicioSesion(name: string, pass: string) {
    this.setrRUTvar(name);
    this.setPassVar(pass);
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?user=' + this.user + '&pass=' + this.pass + '&session')
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
  // CONSULTA DE USUARIO (SESIÓN)
  // ==============================================================
  consultUsuario(usuario: any) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?user=' + usuario + '&consultaUser')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              this.router.navigate(['./error-conexion']);
            }
          );
      }
    );
  }

  // ==============================================================
  // CONSULTA TODOS LOS USUARIOS
  // ==============================================================
  consultTodosUsuarios() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?getAll')
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
  // CONSULTA TODOS LOS USUARIOS
  // ==============================================================
  consultPredefinido() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?consultaPredefinido')
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
  // CONSULTA DE USUARIO (SESIÓN)
  // ==============================================================
  cunsultaUserReporte(idUser: any) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?ID=' + idUser + '&consultaUserEdit')
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
  // CONSULTA DE USUARIO (SESIÓN)
  // ==============================================================
  cunsultaReporte(idUser:number) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?ID=' + idUser + '&consultaUserEdit')
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
  // REGISTRO DE REPORTES
  // ==============================================================
  detalleReporteAdd(datos: any) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?nuevoReportepos', body)
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
  // REGISTRO DE REPORTES DE SOLUCION FOTOS
  // ==============================================================
  detalleReporteAddFoto() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?rut=' + this.userFoto + '&consultaUserReporte')
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
  // REGISTRO DE SOLUCION FOTOS
  // ==============================================================
  detalleSolucionAddFoto() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?rut=' + localStorage.getItem('id') + '&consultaSolFoto')
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

  // tslint:disable-next-line:variable-name
  addImageReporte(idReporte: number, urlImage: string, usuario_crea:string) {
    const datos = {
      // tslint:disable-next-line:object-literal-key-quotes
      'idReporte': idReporte,
      // tslint:disable-next-line:object-literal-key-quotes
      'rutaFoto': urlImage,
      // tslint:disable-next-line:object-literal-key-quotes
      'usuario_crea': usuario_crea,
    };
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?addFotoReporte', body)
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
  // REGISTRO DE IMAGEN  REPORTES SOLUCION
  // ==============================================================
  addImageSolución(idSolucion: number, urlImage: string, idUsuario: number) {
    const datos = {
      'idSolucion': idSolucion,
      'rutaFoto': urlImage,
      'usuario_crea': idUsuario,
    };
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?addFotoSolucion', body)
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
  // REGISTRO DE  REPORTES SOLUCION
  // ==============================================================
  enviarSolucionAdd(usuario: any, reporte: any, desde: any, hasta: any, descripcion: any, urlImage: any, coords: any) {
    this.setrRUTvarFoto(usuario);
    const datos = {
      usuario: localStorage.getItem('id'),
      reporte,
      desde,
      hasta,
      descripcion,
      rutaFoto: urlImage,
      usuario_crea: localStorage.getItem('usuario'),
      coords
    };
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?nuevoSolucionpos', body)
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
  // CONSULTA DE REPORTE PARA SOLUCIÓN
  // ==============================================================
  cunsultaIdReporte(rut: any) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?rut=' + rut + '&consultaReporte')
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
  // CONSULTA TODOS LOS DATOS GENERALES
  // ==============================================================
  consultarPorDatosReporte() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/datos.php?getAllDatos')
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
  // CONSULTA TODOS LOS DATOS GENERALES DEL MÓVIL
  // ==============================================================
  consultarPorDatosMovil() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/datos.php?getAllDatosMovil')
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

