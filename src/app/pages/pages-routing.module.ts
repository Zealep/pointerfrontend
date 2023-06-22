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
        canActivate: [GuardService]
      },
      {
        path: 'exp-laboral',
        component: ExperienciaLaboralComponent,
        canActivate: [GuardService]
      },
      {
        path: 'exp-laboral/form',
        component: FormExperienciaLaboralComponent,
        canActivate: [GuardService]
      },
      {
        path: 'edu-formal',
        component: EstudioFormalComponent,
        canActivate: [GuardService]
      },
      {
        path: 'edu-formal/form',
        component: FormEstudioFormalComponent,
        canActivate: [GuardService]
      },
      {
        path: 'edu-noformal',
        component: EstudioNoformalComponent,
        canActivate: [GuardService]
      },
      {
        path: 'edu-noformal/form',
        component: FormEstudioNoFormalComponent,
        canActivate: [GuardService]
      },
      {
        path: 'idiomas',
        component: IdiomaComponent,
        canActivate: [GuardService]
      },
      {
        path: 'idiomas/form',
        component: FormIdiomaComponent,
        canActivate: [GuardService]
      },
      {
        path: 'familiares',
        component: FamiliaComponent,
        canActivate: [GuardService]
      },
      {
        path: 'familiares/form',
        component: FormFamiliaComponent,
        canActivate: [GuardService]
      },
      {
        path: 'puestos',
        component: PuestosDisponiblesComponent,
        canActivate: [GuardService]
      },




    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
