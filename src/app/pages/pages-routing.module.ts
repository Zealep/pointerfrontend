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
        component: DatosPersonalesComponent
      },
      {
        path: 'exp-laboral',
        component: ExperienciaLaboralComponent
      },
      {
        path: 'exp-laboral/form',
        component: FormExperienciaLaboralComponent
      },
      {
        path: 'edu-formal',
        component: EstudioFormalComponent
      },
      {
        path: 'edu-formal/form',
        component: FormEstudioFormalComponent
      },
      {
        path: 'edu-noformal',
        component: EstudioNoformalComponent
      },
      {
        path: 'edu-noformal/form',
        component: FormEstudioNoFormalComponent
      }




    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
