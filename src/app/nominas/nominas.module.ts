import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NominasRoutingModule } from './nominas-routing.module';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './components/cargos/cargos.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { ContratoDetailComponent } from './components/contrato-detail/contrato-detail.component';
import { RolesPagoComponent } from './components/roles-pago/roles-pago.component';
import { RolPagoDetailComponent } from './components/rol-pago-detail/rol-pago-detail.component';
import { CargoService } from './services/cargo.service';
import { ContratoService } from './services/contrato.service';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import {
  MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatFormField, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatSelectModule, MatPaginatorModule
} from '@angular/material';
import { RolPago } from './models/rol-pago';
import { RolPagoService } from './services/rol-pago.service';
import { ToolBarAcctionComponent } from "../shared/components/tool-bar-action/tool-bar-action.component";
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../master/services/empresa.service';
import { SelectEmpresaComponent } from '../shared/components/select-empresa/select-empresa.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NominasRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule
  ],

  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargosComponent, CargoDetailComponent, SelectEmpresaComponent,
    ContratosComponent, ContratoDetailComponent, RolesPagoComponent, RolPagoDetailComponent, ToolBarAcctionComponent],
  providers: [CargoService, ContratoService, SeguridadService, RolPagoService, EmpresaService]
})
export class NominasModule { }
