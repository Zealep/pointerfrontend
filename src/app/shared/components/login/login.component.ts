import { TOKEN_NAME } from './../../var.constant';
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin = false

  @Input() error: string | null | undefined;

  form: FormGroup = new FormGroup({
    correo: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.checkLogin();
    }
  }


  checkLogin() {
    let username: string = this.form.get('correo')?.value;
    let clave: string = this.form.get('contraseña')?.value;

    (this.loginservice.authenticate(username.trim(), clave.trim()).subscribe(
      data => {
        this.router.navigate(['pages'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.error.message;

      }
    )
    );

  }

}
