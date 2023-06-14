import { Component, OnInit } from '@angular/core';
import { DetallesService } from 'src/app/service/detalles.service';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

declare var mapboxgl: any;

@Component({
  selector: 'app-detalle-por-reporte',
  templateUrl: './detalle-por-reporte.page.html',
  styleUrls: ['./detalle-por-reporte.page.scss'],
})
export class DetallePorReportePage implements OnInit {

nombre!: string;
descripcion!: string;
url!: string;
urls: any;
coords!: string;
mostrarMap!: false;
public conReporte: any;
  constructor(private detalle: DetallesService,
              private socialSharing: SocialSharing,
              private router: Router) {

        this.detalle.consultarReporte()
    .then(
      async data => {
        this.conReporte = data;
        this.nombre = this.conReporte['Usuario'];
        this.descripcion = this.conReporte['descripcion'];
        this.url = this.conReporte['rutaFoto'];
        this.coords = this.conReporte['coords'];

        this.mapa();

      });

        this.detalle.consultarReporteUrl()
      .then(
        async data => {
          this.urls = data;
        });

  }

  ngOnInit() {

  }

 mapa() {

    const latLng = this.coords.split(',');

    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJpbmZvMTAiLCJhIjoiY2t3a21xZGxpMXRyNzJ2cXEzaGdlbzk0aCJ9.KNJrhNqZGjVfbq4072FrAA';
    const map = new mapboxgl.Map({
    container: 'mapr',
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
