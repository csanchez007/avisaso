import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'carga',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'detalle-reporte',
    loadChildren: () => import('./detalle-reporte/detalle-reporte.module').then( m => m.DetalleReportePageModule)
  },
  {
    path: 'fotos-reporte',
    loadChildren: () => import('./fotos-reporte/fotos-reporte.module').then( m => m.FotosReportePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./lista-reporte/lista-reporte.module').then( m => m.ListaReportePageModule)
  },
  {
    path: 'detalle-por-reporte',
    loadChildren: () => import('./detalles/detalle-por-reporte/detalle-por-reporte.module').then( m => m.DetallePorReportePageModule)
  },
  {
    path: 'detalle-solucion',
    loadChildren: () => import('./detalle-solucion/detalle-solucion.module').then( m => m.DetalleSolucionPageModule)
  },
  {
    path: 'foto-solucion',
    loadChildren: () => import('./foto-solucion/foto-solucion.module').then( m => m.FotoSolucionPageModule)
  },
  {
    path: 'list-solucion',
    loadChildren: () => import('./list-solucion/list-solucion.module').then( m => m.ListSolucionPageModule)
  },
  {
    path: 'de-solucion',
    loadChildren: () => import('./detalles/de-solucion/de-solucion.module').then( m => m.DeSolucionPageModule)
  }

 /*

  { path: 'notificaciones', loadChildren: './notificaciones/notificaciones.module#NotificacionesPageModule' },
  { path: 'combustible', loadChildren: './combustible/combustible.module#CombustiblePageModule' },
  { path: 'foto-combustible', loadChildren: './foto-combustible/foto-combustible.module#FotoCombustiblePageModule' },
  { path: 'error-conexion', loadChildren: './error-conexion/error-conexion.module#ErrorConexionPageModule' },
  { path: 'list-combustible', loadChildren: './list-combustible/list-combustible.module#ListCombustiblePageModule' },
  { path: 'de-combustible', loadChildren: './detalles/de-combustible/de-combustible.module#DeCombustiblePageModule' },*/
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
