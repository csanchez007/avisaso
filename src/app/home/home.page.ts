import { Component, HostListener} from '@angular/core';
import { Platform, MenuController, IonicModule } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public datosUser!: string;
  public apellido!: string;
  public email!: string;
  public tu!: string;
  public activo!: string;
  public condominio!: string;

  public usuarios: any;

  constructor(private platform: Platform,
              private usuario: UsuarioService,
              public menuCtrl: MenuController) {

                const usuarioID = localStorage.getItem('usuario');

                this.usuario.consultUsuario(usuarioID)
                .then(
                  data => {
                   this.usuarios = data;

                   this.datosUser = this.usuarios['nombre'];
                   this.apellido = this.usuarios['apellido'];
                   this.condominio = this.usuarios['NOMBRE_CLIENTE'];
                   this.email = this.usuarios['correo'];
                   this.tu = this.usuarios['tipo_usuario'];
                   if (this.usuarios['estado'] === '1') {
                    this.activo = 'Activo';
                  } else {
                    this.activo = 'Inactivo';
                  }
                  }
                )
                .catch(
                  error => {
                    console.log(error);
                  }
                );
              // };

                IonicModule.forRoot({hardwareBackButton: false});

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.menuCtrl.enable(true);
    // window.location.reload();

  }
  exitApp() {
    // tslint:disable-next-line:no-string-literal
    //navigator['app'].exitApp();
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
