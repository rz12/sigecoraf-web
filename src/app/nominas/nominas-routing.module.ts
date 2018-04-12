import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { RolesPagoComponent } from './components/roles-pago/roles-pago.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'cargo-detail/:id', component: CargoDetailComponent },
  { path: 'empleado-detail/:id', component: EmpleadoDetailComponent },
  { path: 'rolPago', component: RolesPagoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }
