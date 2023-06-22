import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AltaUserComponent } from './components/login/alta-user/alta-user.component';
import { RestorePassComponent } from './components/login/restore-pass/restore-pass.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { OportunidadLaboralComponent } from './components/oportunidad-laboral/oportunidad-laboral.component';



@NgModule({
  declarations: [LoginComponent, HeaderComponent, ConfirmDialogComponent, AltaUserComponent, RestorePassComponent, UploadFilesComponent, OportunidadLaboralComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent,
    UploadFilesComponent
  ],
  entryComponents: [ConfirmDialogComponent]

})
export class SharedModule { }
