import { Component, OnInit, Inject, ViewContainerRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import { DialogService } from "../../../shared/dialog/services/dialog.service";
import { DashboardComponent } from "../../../dashboard/dashboard.component";
import { SeguridadService } from "../../services/seguridad.service";
import { enums } from "../../../credentials";
import { ParametrizacionService } from "../../../master/services/parametrizacion.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = { username: "", password: "" };
  loginForm: any;
  @ViewChild(DashboardComponent) dashboardComponent: DashboardComponent;
  constructor(private usuarioService: UsuarioService, private seguridadService: SeguridadService, @Inject(FormBuilder) fb: FormBuilder, private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef, private router: Router, private parametrizacionService: ParametrizacionService) {
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
    this.seguridadService.autenticate(this.user).then(res => {
      if (res == true) {
        let token = this.seguridadService.getToken()
        this.getParametros(token);
        this.router.navigate(['home'])
      } else {
        this.dialogService.notificacion('ERROR!', 'No puede iniciar sesión con las credenciales proporcionadas.', this.viewContainerRef)
      }
    });
  }
  public getParametros(token) {
    if (token) {
      this.parametrizacionService.getParametrizaciones(token).subscribe(
        res => {
          this.parametrizacionService.setParametros(res.data);
          localStorage.setItem(enums.SISTEMA_PARAM, JSON.stringify(res.data))
          this.seguridadService.sessionTimeout(res.data)
        });
    }
  }
}
