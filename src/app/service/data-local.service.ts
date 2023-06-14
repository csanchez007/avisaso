import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

 usuario: any;

  constructor() {
    this.verUsuario();
  }

  guardarSesion(usuario: string) {
    localStorage.setItem('users', usuario)
  }

  guardarSesionId(id: string) {
    localStorage.setItem('id', id)
  }
  async verUsuario() {
   this.usuario = localStorage.getItem('users');
  }
   limpiarStorage() {
  localStorage.clear();

  }
}
