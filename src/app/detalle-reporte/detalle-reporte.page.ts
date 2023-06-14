import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';
//import { NotificacionesService } from '../service/notificaciones.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVIS } from '../config/url.servicios';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare const window: any;


@Component({
  selector: 'app-detalle-reporte',
  templateUrl: './detalle-reporte.page.html',
  styleUrls: ['./detalle-reporte.page.scss'],
})
export class DetalleReportePage implements OnInit {
  image!:string;
  resultadoSacan: string;
  tempImages: string[] = [];
  usuarios: any;
  public contUsuario: any;
  public cunUserReporte: any;
  idUsuario = localStorage.getItem('usuario');
  idUser = localStorage.getItem('id');
  apellido!: string;
  descripcion!: string;
  descripcionSolucion!:string
  urlImage!: string;
  predefinido: any;
  idPredef: any;

  datosUser!: string;
  RUT!: string;

  post = {
    coords: '',
    posicion: false
  };

  cargandoGeo = false;

  public datosGeneralesPatente: any;
  public cboPatente!: string;

  constructor(private barcodeScanner: BarcodeScanner,
              private router: Router,
              public alertController: AlertController,
              private camera: Camera,
              private servicio: UsuarioService,
              private geolocation: Geolocation,
              public http: HttpClient
              //public noti: NotificacionesService
              ) {
    this.resultadoSacan = '';

    this.servicio.consultUsuario(localStorage.getItem('usuario'))
      .then(
        async data => {
          this.contUsuario = data;
          this.RUT = this.contUsuario['usuario'];
          this.datosUser = this.contUsuario['nombre'];
        });

    this.servicio.consultPredefinido()
        .then(
          async data => {
            // tslint:disable-next-line:no-string-literal
            this.predefinido = data;
          });

          this.servicio.consultarPorDatosMovil()
          .then(
            async data => {
              this.datosGeneralesPatente = data;
            });
  }

  ngOnInit() {

  }

  setrIMGvar(value:string) {
    this.urlImage = value;
  }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.resultadoSacan = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  camara() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
    };
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch(error => {
        console.error(error);
      });
  }
  uploadimagen() {

    const url = URL_SERVIS + '/appcondominio/assets/detalle_reporte/images.php';
    let postData = new FormData();

    postData.append('file', this.image);
    let data: Observable<any> = this.http.post(url, postData);
    data.subscribe((result) => {
      console.log(result.image_url);
      this.setrIMGvar(result.image_url);
    });
  }
  buscarUsuario() {
    this.servicio.cunsultaUserReporte(this.idUsuario)
      .then(
        async data => {
          this.cunUserReporte = data
          this.apellido = this.cunUserReporte['apellido'];
          this.cboPatente = this.cunUserReporte['unidad'];
        });
  }
  // Enviar Reporte
 async enviarReporteAdd() {
    if (this.post.coords === '' ) {
      const alert = await this.alertController.create({
        header: 'Atención!',
        message: 'Por favor active su posición actual',
        buttons: ['CERRAR']
      });
      await alert.present();
    } else {
      const datos = {
        idUsuario: this.idUser,
        id_numPatente: this.cboPatente,
        descripcion: this.descripcion,
        descripcionSolucion: this.descripcionSolucion,
        idPredef: this.idPredef,
        descripcionQR: this.resultadoSacan,
        rutaFoto: this.urlImage,
        coords:this.post.coords
      };
    this.servicio.detalleReporteAdd(datos)
      .then(
        async data => {
          this.irRegistroFoto();
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );
    }
  }

  irRegistroFoto() {
    this.post.coords = '';
    this.post.posicion = false;
    this.cargandoGeo = false;

    this.router.navigate(['./fotos-reporte']);
  }
  irAlHome() {
    this.router.navigate(['./home']);

    this.post.coords = '';
    this.post.posicion = false;
    this.cargandoGeo = false;
  }
    /*
    NOTIFICACIONES******************
    enviarNotReporte() {
    this.noti.enviarNotReporte()
      .then(
        async data => {
          console.log(data);
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );
  }*/

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = '';
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });

    console.log(this.post);
  }
}
