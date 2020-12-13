import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AltaUserComponent } from './components/login/alta-user/alta-user.component';
import { RestorePassComponent } from './components/login/restore-pass/restore-pass.component';



@NgModule({
  declarations: [LoginComponent, HeaderComponent, ConfirmDialogComponent, AltaUserComponent, RestorePassComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent]

})
export class SharedModule { }
