import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = { username: "", password: "" };
  loginForm: any;
  constructor(
    private usuarioService: UsuarioService,
    @Inject(FormBuilder) fb: FormBuilder) {
    this.loginForm = fb.group({
      user: fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
      })
    });
  }

  ngOnInit() { }
  login() {
    this.user.username = this.loginForm.value.user.username;
    this.user.password = this.loginForm.value.user.password;
    this.usuarioService.autenticate(this.user).then(res => {
      console.log(res);
    });
  }
}
