import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NominasRoutingModule } from './nominas-routing.module';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './components/cargos/cargos.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NominasRoutingModule,
  ],
  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargosComponent, CargoDetailComponent]
})
export class NominasModule { }
