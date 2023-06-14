import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVIS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  // ==============================================================
  // CONSULTA TODOS LOS MENU
  // ==============================================================
  consultMenus(menu: any) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/menu_app.php?menu=' + menu + '&getAllMenu')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
}
