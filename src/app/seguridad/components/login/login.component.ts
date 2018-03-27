import { Component, OnInit, Inject, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import { DialogService } from "../../../shared/dialog/services/dialog.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = { username: "", password: "" };
  loginForm: any;
  constructor(private usuarioService: UsuarioService, @Inject(FormBuilder) fb: FormBuilder, private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef, private router: Router) {
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
      if (res == true) {
        this.router.navigate(['home'])
      } else {
        this.dialogService.notificacion('ERROR!', 'No puede iniciar sesión con las credenciales proporcionadas.', this.viewContainerRef)
      }
    });
  }
}
