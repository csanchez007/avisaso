import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { UsuarioService } from '../service/usuario.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVIS } from '../config/url.servicios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foto-solucion',
  templateUrl: './foto-solucion.page.html',
  styleUrls: ['./foto-solucion.page.scss'],
})
export class FotoSolucionPage implements OnInit {

  image: any;
  tempImages: string[] = [];
  urlImage!: string;
  idSolucion: any;
  guardarFotoSol = false;
  salirFotoSol = false;
  idUsuario: any;
  public detalleSolucionAddFotoId: any;

  constructor(private camera: Camera,
              public http: HttpClient,
              private servicio: UsuarioService,
              public alertController: AlertController,
              private router: Router) {
                this.idUsuario = localStorage.getItem('usuario');
               }


  setrIMGvar(value: string) {
    this.urlImage = value;
  }

  setrIMGidSolucion(value: number) {
    this.idSolucion = value;
  }
  /*=============================================
	CARGAR IMAGEN DESDE LA CAMARÁ
	=============================================*/
  camara() {
    this.guardarFotoSol = true;
    this.salirFotoSol = true;

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
  async uploadimagen() {

    if (this.idSolucion == null) {
      const alert = await this.alertController.create({
        header: 'ERROR!',
        message: 'No puede subir fotos, por que no hagrego un reporte.',
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
    this.servicio.detalleSolucionAddFoto()
    .then(
      async data => {
        this.detalleSolucionAddFotoId = data;
        console.log(this.detalleSolucionAddFotoId[0]);
        this.setrIMGidSolucion(this.detalleSolucionAddFotoId[0]);
      });
  }


  guardarImageReporte() {


    this.servicio.addImageSolución(
      this.idSolucion,
      this.urlImage,
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
