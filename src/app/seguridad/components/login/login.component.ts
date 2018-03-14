import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from "../../services/usuario.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };
  loginForm: any;
  constructor(private usuarioService: UsuarioService, @Inject(FormBuilder) fb: FormBuilder) {
    this.loginForm = fb.group({
      user: fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      }),
    });
  }

  ngOnInit() {

  }
  login() {
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    console.log(this.loginForm.value.username)
    this.usuarioService.autenticate(this.user).then((res) => {
      console.log(res)
    });
  }
}
