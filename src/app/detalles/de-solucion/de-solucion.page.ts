import { Component, OnInit } from '@angular/core';
import { DetallesService } from 'src/app/service/detalles.service';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

declare var mapboxgl: any;


@Component({
  selector: 'app-de-solucion',
  templateUrl: './de-solucion.page.html',
  styleUrls: ['./de-solucion.page.scss'],
})
export class DeSolucionPage implements OnInit {
  nombre!: string;
  descripcion!: string;
  desde!: string;
  hasta!: string;
  url!: string;
  urls: any;
  coords!: string;

  public conSolucion: any

  constructor(private detalle: DetallesService,
              private socialSharing: SocialSharing,
              private router: Router) {
    this.detalle.consultarSolucion()
    .then(
      async data => {
        console.log(data);
        this.conSolucion = data;

        this.nombre = this.conSolucion[0]['Clientes'];
        this.descripcion = this.conSolucion[0]['descripcion'];
        this.desde =this.conSolucion[0]['desde'];
        this.hasta = this.conSolucion[0]['hasta'];
        this.url = this.conSolucion[0]['rutaFoto'];
        this.coords =this.conSolucion[0]['coords'];
        this.mapa();
      });

    this.detalle.consultarSolucionUrl()
      .then(
        async data => {
          console.log(data);
          // tslint:disable-next-line:no-string-literal
          this.urls = data;
        });
   }

  ngOnInit() { }

  mapa() {

    console.log(this.coords);
    const latLng = this.coords.split(',');

    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJpbmZvMTAiLCJhIjoiY2t3a21xZGxpMXRyNzJ2cXEzaGdlbzk0aCJ9.KNJrhNqZGjVfbq4072FrAA';
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 15
    });

    const marker = new mapboxgl.Marker()
        .setLngLat( [lng, lat] )
        .addTo( map );
  }

  compartirReporte() {

    this.socialSharing.share(
      'Nombre: ' + this.nombre + ' - ' + 'Descripción: ' + this.descripcion,
      '',
      '',
      ' - URL de una de las imagenes: ' + this.url
    );
  }
}
