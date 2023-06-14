import { Component } from '@angular/core';
import { DataLocalService } from './service/data-local.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { MenuService } from './service/menu.service';
import { UsuarioService } from './service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  tipoUsuario!: string;
  menus: any;
  sesion!: string;
  tipo!: string;
  cliente!: string;
  user: any;
  public usuarioTipos: any;

  public navegador: any;
  //public id: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuService,
    private usuario: UsuarioService,
    public datalocalService: DataLocalService,
    private router: Router
  ) { }

  initializeApp() {
    this.platform.ready().then(() => {
      if ( localStorage.getItem('usuario') !== null ) {
        this.router.navigate(['./home']);
        } else {
          this.router.navigate(['./sesion']);
        }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    //  this.notificaciones.iniciarNotificaciones();
    });
  }
  ngOnInit() {
    if ( localStorage.getItem('usuario') !== null ) {
   window.onload = () => {

      this.usuario.consultUsuario(localStorage.getItem('usuario'))
      .then(
        data => {
         this.user = data;
         this.tipo = this.user['tipo_usuario'];
         this.cargarMenuPermisos(this.tipo);
         // console.log(data);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  };
} else {
  this.initializeApp();
}
  }

  cargarMenuPermisos(menu: any) {

    this.menu.consultMenus(menu)
    .then(
      async data => {
        this.menus = data;
      });

    this.initializeApp();
    }
    cerrarSesion() {

      this.datalocalService.limpiarStorage();
      this.navegador.exitApp();
    }

  /*************************************************
   EN INICIO DE SESIÓN
   ************************************************/
  consultaTipoSesion(usuarioTipo: any) {
    this.usuario.consultUsuario(usuarioTipo)
    .then(
      data => {
        console.log(data);
        this.usuarioTipos = data;
        this.tipo = this.usuarioTipos['tipo_usuario'];
        // tslint:disable-next-line:no-string-literal
        this.cliente = this.usuarioTipos['CLIENTE'];
       // localStorage.setItem('cliente', this.cliente);
        localStorage.setItem('id', this.usuarioTipos['id']);

        this.menuSesion(this.tipo);
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }
  menuSesion(menus:any) {
    this.menu.consultMenus(menus)
    .then(
      async data => {
        this.menus = data;
      });

    this.statusBar.styleDefault();
    this.splashScreen.hide();

  }
}
