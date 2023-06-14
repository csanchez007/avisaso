import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { DataLocalService } from '../service/data-local.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  datosUser!: string;
  apellido!: string;
  email!: string;
  tu!: string;
  activo!: string;
  tipo!: string;
  user!: string;
  public datosUsuarios: any;

  constructor(private usuario: UsuarioService,
              private router: Router,
              public datalocalService: DataLocalService) { }

  ngOnInit() {
  //  window.onload = () => {
    this.usuario.consultUsuario(localStorage.getItem('usuario'))
      .then(
        data => {
         this.datosUsuarios = data;
         this.datosUser = this.datosUsuarios['nombre'];
         this.apellido = this.datosUsuarios['apellido'];
         this.email = this.datosUsuarios['correo'];
         this.user = this.datosUsuarios['usuario'];
         this.tipo = this.datosUsuarios['Descripcion'];

         if (this.datosUsuarios['estado'] === '1') {
          this.activo = 'Activo';
        } else {
          this.activo = 'Inactivo';
        }
         //console.log(data);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
    // };
  }
  irAlHome() {
    this.router.navigate(['./home']);
  }

}
