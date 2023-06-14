import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalleSolucionPage } from './detalle-solucion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleSolucionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleSolucionPage]
})
export class DetalleSolucionPageModule {}
