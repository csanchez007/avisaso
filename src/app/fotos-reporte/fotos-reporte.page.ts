import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { UsuarioService } from '../service/usuario.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVIS } from '../config/url.servicios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fotos-reporte',
  templateUrl: './fotos-reporte.page.html',
  styleUrls: ['./fotos-reporte.page.scss'],
})
export class FotosReportePage implements OnInit {
  image: any;
  tempImages: string[] = [];
  urlImag!: string;
  idReporte: any;
  idUsuario: any;

  public deReporteAddFoto: any;


  guardarFoto = false;
  salirFoto = false;
  constructor(private camera: Camera,
              public http: HttpClient,
              private servicio: UsuarioService,
              public alertController: AlertController,
              private router: Router) {
    this.idUsuario= localStorage.getItem('usuario');
    this.servicio.detalleReporteAddFoto()
    .then(
      async data => {
        this.deReporteAddFoto = data;
        console.log(this.deReporteAddFoto[0]);
        this.setrIMGidReporte( this.deReporteAddFoto[0]);
      });
               }


  setrIMGvar(value:string) {
    this.urlImag = value;
  }

  setrIMGidReporte(value: number) {
    this.idReporte = value;
  }
  /*=============================================
	CARGAR IMAGEN DESDE LA CAMARÁ
	=============================================*/
  camara() {
    this.guardarFoto = true;
    this.salirFoto = true;

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
    };
    this.procesarImagen(options);
  }
  /*=============================================
	CARGAR IMAGEN DESDE LA LIBRERIA
	=============================================*/
  libreria(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }
  /*=============================================
	PROCESAR IMAGEN
	=============================================*/
  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options)
      .then((imageData: any) => {
        this.image = `data:image/jpeg;base64,${imageData}`;
      })
      .catch((error: string) => {
        console.error(error);
      });
  }
  /*=============================================
	GUARDAR IMAGEN DESDE LA CAMARÁ
	=============================================*/
  async uploadimagen() {

    if (this.idReporte == null) {
      const alert = await this.alertController.create({
        header: 'ERROR!',
        message: 'No puede subir fotos, por que no agrego un reporte.',
        buttons: ['Cerrar']
      });
      await alert.present();
    } else {
      const url = URL_SERVIS + '/omrservice/assets/detalle_reporte/images.php';

      let postData = new FormData();

      postData.append('file', this.image);

      let data: Observable<any> = this.http.post(url, postData);
      data.subscribe(async (result) => {
        console.log(result.image_url);
        this.setrIMGvar(result.image_url);
        this.guardarImageReporte();

        const alert = await this.alertController.create({
          header: 'Carga exitosa',
          message: 'Imagen guardada correctamente',
          buttons: ['ACEPTAR']
        });
        await alert.present();
      });
    }
  }

  ngOnInit() {
  }


  guardarImageReporte() {


    this.servicio.addImageReporte(
      this.idReporte,
      this.urlImag,
      this.idUsuario
    )
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

  }
  irAlHome() {
    this.router.navigate(['./home']);
  }


}
