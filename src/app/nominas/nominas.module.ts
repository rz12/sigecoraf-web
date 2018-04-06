import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NominasRoutingModule } from './nominas-routing.module';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CargoComponent } from './components/cargo/cargo.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { ContratoDetailComponent } from './components/contrato-detail/contrato-detail.component';
import { RolesPagoComponent } from './components/roles-pago/roles-pago.component';
import { RolPagoDetailComponent } from './components/rol-pago-detail/rol-pago-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NominasRoutingModule,
  ],
  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargoComponent,
     ContratosComponent, ContratoDetailComponent, RolesPagoComponent, RolPagoDetailComponent]
})
export class NominasModule { }
