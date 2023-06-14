import { Injectable, EventEmitter} from '@angular/core';
//import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIS } from '../config/url.servicios';

/*
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  mensajes: OSNotificationPayload[] = [];

  userId!: string;

  pushListener = new EventEmitter<OSNotificationPayload>();

  user = localStorage.getItem('usuario');

  titulo!: string;

  mensaje!: string;

  constructor(private oneSignal: OneSignal,
              private http: HttpClient,
              private storage: Storage) {
              this.cargarMensajes();
              }

    async getMensajes() {
      await this.cargarMensajes();
      return [...this.mensajes];
    }

  iniciarNotificaciones() {
    this.oneSignal.startInit('060e5179-d05f-4e8b-969f-65de4ccd40c1', '642293116763');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log('Notificación recibida', noti);
     this.notificacionRecividas( noti );
    });

    this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
      // do something when a notification is opened
      console.log('Notificación abierta', noti);
      await this.notificacionRecividas(noti.notification);
    });

    // OBTENER ID EQUIPO Y SUPCRITOR
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      console.log(this.userId);
    });

    this.consultaIdsubcrictor();
    this.oneSignal.endInit();

  }
  /*=============================================
  UPDATE SUPCRIPTOR POR ID EQUIPO
  =============================================*/
 /* consultaIdsubcrictor() {
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      return new Promise(
        resolve => {
          // tslint:disable-next-line:max-line-length
          this.http.get(URL_SERVIS + '/appcondominio/servicios/usuarios.php?user=' + this.user + '&userId=' + this.userId + '&updateEquipo')
            .subscribe(
              data => {
                console.log(data);
              },
              err => {
                console.log(err);
              });
        }
      );
    });
  }

    async notificacionRecividas( noti: OSNotification ) {
    await this.cargarMensajes();
    const payload = noti.payload;

    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID);

    if ( existePush ) {
      return;
    }

    this.mensajes.unshift( payload );

    this.pushListener.emit(payload);

    await this.guardarMensajes();
  }
  guardarMensajes() {
    this.storage.set('mensajes', this.mensajes);
  }
  async cargarMensajes() {
    this.mensajes = await this.storage.get('mensajes') || [];

    return this.mensajes;
  }

 async borrarMensajes() {
  await this.storage.remove('mensajes');
  this.mensajes = [];
  this.guardarMensajes();
}

  /*=============================================
  NOTIFICACIONES AUTOMATICAS REPORTES
  =============================================*/
 /* enviarNotReporte() {
      // tslint:disable-next-line:no-unused-expression
      this.titulo = 'Reporte';
      // tslint:disable-next-line:no-unused-expression
      this.mensaje = 'Se ha ingresado un nuevo reporte';
      return new Promise(
        resolve => {
          // tslint:disable-next-line:max-line-length
          this.http.get(URL_SERVIS + '/appcondominio/servicios/noti.php?user=' + this.user + '&include_player_ids=' + this.userId + '&titulo=' + this.titulo + '&mensaje=' + this.mensaje + '&noti_auto')
            .subscribe(
              data => {
                console.log(data);
              },
              err => {
                console.log(err);
              });
        }
      );

  }
  /*=============================================
  NOTIFICACIONES AUTOMATICAS REPORTES SOLUCION
  =============================================*/
 /* enviarNotReporteSolucion(idReporte) {
    // tslint:disable-next-line:no-unused-expression
    this.titulo = 'Solucion';
    // tslint:disable-next-line:no-unused-expression
    this.mensaje = 'Se ha ingresado la solución a su reporte';
    return new Promise(
      resolve => {
        // tslint:disable-next-line:max-line-length
        this.http.get(URL_SERVIS + '/appcondominio/servicios/noti.php?user=' + this.user + '&include_player_ids=' + this.userId + '&titulo=' + this.titulo + '&mensaje=' + this.mensaje + '&idReporte=' + idReporte + '&noti_auto')
          .subscribe(
            data => {
              console.log(data);
            },
            err => {
              console.log(err);
            });
      }
    );

}

}*/
