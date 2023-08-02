import { GuardService } from './../services/guard.service';
import { FormFamiliaComponent } from './familia/form-familia/form-familia.component';
import { FamiliaComponent } from './familia/familia.component';
import { FormIdiomaComponent } from './idioma/form-idioma/form-idioma.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { FormEstudioNoFormalComponent } from './estudio-noformal/form-estudio-noformal/form-estudio-noformal.component';
import { FormEstudioFormalComponent } from './estudio-formal/form-estudio-formal/form-estudio-formal.component';
import { EstudioNoformalComponent } from './estudio-noformal/estudio-noformal.component';
import { FormExperienciaLaboralComponent } from './experiencia-laboral/form-experiencia-laboral/form-experiencia-laboral.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { EstudioFormalComponent } from './estudio-formal/estudio-formal.component';
import { PuestosDisponiblesComponent } from './puestos-disponibles/puestos-disponibles.component';
import { AuthGaurdService } from '../services/auth-gaurd.service';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [ //
      {
        path: '', //
        pathMatch: 'full',
        redirectTo: 'datos-personales'
      },
      {
        path: 'datos-personales',
        component: DatosPersonalesComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'exp-laboral',
        component: ExperienciaLaboralComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'exp-laboral/form',
        component: FormExperienciaLaboralComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'edu-formal',
        component: EstudioFormalComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'edu-formal/form',
        component: FormEstudioFormalComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'edu-noformal',
        component: EstudioNoformalComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'edu-noformal/form',
        component: FormEstudioNoFormalComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'idiomas',
        component: IdiomaComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'idiomas/form',
        component: FormIdiomaComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'familiares',
        component: FamiliaComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'familiares/form',
        component: FormFamiliaComponent,
        canActivate: [AuthGaurdService]
      },
      {
        path: 'puestos',
        component: PuestosDisponiblesComponent,
        canActivate: [AuthGaurdService]
      },




    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
