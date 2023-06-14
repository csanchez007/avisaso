import { Component, OnInit, HostListener } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DataLocalService } from '../service/data-local.service';
import { AppComponent } from '../app.component';


declare var alerta: any;
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

  usser: string;
  pass: string;
  sessionausuario: any;


  constructor(private router: Router,
              private servicio: UsuarioService,
              public alertController: AlertController,
              private dataLocalService: DataLocalService,
              public component: AppComponent,
              public menuCtrl: MenuController) {
                this.usser = '';
                this.pass = '';

  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
  Session() {
    this.servicio.inicioSesion(this.usser, this.pass)
      .then(
        async data => {

         // console.log(data);
          this.sessionausuario = data;
         /* SI ES CORRECTO */
          if (this.sessionausuario === 1) {
            localStorage.setItem('usuario', this.usser);
            this.dataLocalService.guardarSesion(this.usser);
            this.router.navigate(['./home']);
            this.component.consultaTipoSesion(this.usser);
          } else {
            const alert = await this.alertController.create({
              header: 'Atención!',
              message: 'Usuario o contraseña invalido.',
              buttons: ['Cerrar']
            });
            await alert.present();
          }
        });
  }
irRegistro() {
  this.router.navigate(['./home']);
}
onKey(rut:string)  {
alerta();

}
/** Stop hardware back button */
@HostListener('document:ionBackButton', ['$event'])
overrideHardwareBackAction(event: any) {
  console.log('back button');
  event.detail.register(100, async () => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
  });
}

}
