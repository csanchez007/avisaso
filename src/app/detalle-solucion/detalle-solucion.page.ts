import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVIS } from '../config/url.servicios';
import { Router } from '@angular/router';
//import { NotificacionesService } from '../service/notificaciones.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-detalle-solucion',
  templateUrl: './detalle-solucion.page.html',
  styleUrls: ['./detalle-solucion.page.scss'],
})
export class DetalleSolucionPage implements OnInit {

  usuarios:any;
  image!: string;
  urlImage!: string;
  idReporte!: number;
  usuario!: string;
  descripcion!: string;
  desde!: string;
  hasta!: string;
  idUsuario!:string;
  reporte: any;
  reportes: any;
  datosUser!: string;
  RUT!: string;

  public contUsuario: any;
  post = {
    coords: '',
    posicion: false
  };

  cargandoGeo = false;

  constructor(
    public alertController: AlertController,
    private camera: Camera,
    private router: Router,
    private servicio: UsuarioService,
    private geolocation: Geolocation,
   // public noti: NotificacionesService,
    public http: HttpClient) {

      this.servicio.consultUsuario(localStorage.getItem('usuario'))
      .then(
        async data => {
          this.contUsuario = data
          this.RUT = this.contUsuario['usuario'];
          this.datosUser = this.contUsuario['nombre'];
        });
  }

  ngOnInit() {
  }

  setrIMGvar(value: string) {
    this.urlImage = value;
  }

  camara() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
    };
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error => {
      console.error( error );
    });
  }
  uploadimagen() {
    const url = URL_SERVIS + '/appcondominio/assets/detalle_reporte/images.php';
    // tslint:disable-next-line:prefer-const
    let postData = new FormData();
    postData.append('file', this.image);
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:prefer-const
    let data: Observable<any> = this.http.post(url, postData );
    data.subscribe((result) =>  {
      console.log(result.image_url);
      this.setrIMGvar(result.image_url);
    });
    }
// Enviar Reporte
  async SolucionAdd() {

  if (this.post.coords === '') {
    const alert = await this.alertController.create({
      header: 'Atención!',
      message: 'Por favor active su posición actual',
      buttons: ['CERRAR']
    });
    await alert.present();
  }else if (this.desde === undefined || this.hasta === undefined) {
      const alert = await this.alertController.create({
        header: 'Atención!',
        message: 'Fechas vacías',
        buttons: ['CERRAR']
      });
      await alert.present();

  } else {
    let id = localStorage.getItem('id')
    this.servicio.enviarSolucionAdd(
    id,
    this.reporte,
    // En las fecha se debe agregar de esta manera
    this.desde.split('T')[0],
    this.hasta.split('T')[0],
    this.descripcion,
    this.urlImage,
    this.post.coords)
    .then(
      async data => {
        console.log(data);
        // this.enviarNotReporte(this.reporte);
        this.limpiarCampos();
        this.irSolucionFoto();
      }
    )
    .catch(
      error => {
        console.log(error + 'no se pudo insertar datos');
      }
    );
  }
}
  limpiarCampos() {
    this.usuario = 'Usuario';
    this.reporte = 'Reporte';
    this.desde = '';
    this.descripcion = '';
    this.hasta = '';
    this.image = '';
  }
  /*  NOTIFICACIONES ****
  enviarNotReporte(idReporte: number) {
    this.noti.enviarNotReporteSolucion(idReporte)
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
  irSolucionFoto() {
    this.router.navigate(['./foto-solucion']);
  }



  buscarReporte() {
    this.servicio.cunsultaIdReporte(localStorage.getItem('id'))
      .then(
        async data => {
         this.reportes = data;
        });
  }
  irAlHome() {
    this.post.coords = '';
    this.post.posicion = false;
    this.cargandoGeo = false;
    this.router.navigate(['./home']);
  }

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
