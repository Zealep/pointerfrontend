import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { FormExperienciaLaboralComponent } from './experiencia-laboral/form-experiencia-laboral/form-experiencia-laboral.component';
import { EstudioFormalComponent } from './estudio-formal/estudio-formal.component';
import { EstudioNoformalComponent } from './estudio-noformal/estudio-noformal.component';
import { FormEstudioNoFormalComponent } from './estudio-noformal/form-estudio-noformal/form-estudio-noformal.component';
import { FormEstudioFormalComponent } from './estudio-formal/form-estudio-formal/form-estudio-formal.component';



@NgModule({
  declarations: [DatosPersonalesComponent, ExperienciaLaboralComponent, FormExperienciaLaboralComponent, EstudioFormalComponent, EstudioNoformalComponent, FormEstudioNoFormalComponent, FormEstudioFormalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class PagesModule { }
