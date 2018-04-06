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
import { SeguridadService } from '../seguridad/services/seguridad.service';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NominasRoutingModule,
    MatTableModule
  ],

  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargosComponent, CargoDetailComponent,
    ContratosComponent, ContratoDetailComponent, RolesPagoComponent, RolPagoDetailComponent],
  providers: [CargoService, SeguridadService]
})
export class NominasModule { }
