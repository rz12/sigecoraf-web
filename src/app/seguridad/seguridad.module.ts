import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './components/login/login.component';
import { UsuarioService } from './services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule } from '@angular/material';
import { DialogModule } from "../shared/components/dialog/dialog.module";
import { DashboardComponent } from '../dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    DialogModule,
  ],
  declarations: [LoginComponent],
  providers: [UsuarioService]
})
export class SeguridadModule { }
