import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
    formLogin: FormGroup = new FormGroup({});
    constructor(private _authService: AuthService, private cookie: CookieService) { }
    errorSesion : boolean = false;
  
    ngOnInit(): void {
      this.formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });

    }

    sendLogin(): void{
      const {email, password} = this.formLogin.value;
      this._authService.sendCredentials(email, password)
      .subscribe(responseOk =>{ // Cuando el email y password es correcto
        console.log('responseOk:', JSON.stringify(responseOk, null, 2));
        
      },
      (error) =>{ // Cuando el email y password es incorrecto
        console.log(`Error no se puede iniciar sesion: ${error.status}`);
        this.errorSesion = true;
      })
    }
}
