import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
    formLogin: FormGroup = new FormGroup({});
    constructor(private _authService: AuthService, private cookie: CookieService, private router: Router) { }
    errorSesion : boolean = false;
  
    ngOnInit(): void {
      this.formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });

    }

    sendLogin(): void {
      const { email, password } = this.formLogin.value;
      this._authService.sendCredentials(email, password)
        .subscribe(
          (responseOk: any) => { // Cuando el email y password es correcto
            
            const {tokenSession, data} = responseOk;
            this.cookie.set('token', tokenSession, 4, '/');
            console.log(responseOk);
            console.log(`Bienvenido ${data.name}`);
            this.router.navigate(['/', 'tracks']);
            
          },
          (error) => { // Cuando el email y password es incorrecto
            console.log(`Error no se puede iniciar sesion: ${error.status}`);
            this.errorSesion = true;
          }
        );
    }
}
