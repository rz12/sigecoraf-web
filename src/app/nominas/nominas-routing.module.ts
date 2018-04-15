import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { RolesPagoComponent } from './components/roles-pago/roles-pago.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';
<<<<<<< HEAD
import { ContratoDetailComponent } from './components/contrato-detail/contrato-detail.component';
import { RolPagoDetailComponent } from './components/rol-pago-detail/rol-pago-detail.component';
=======
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
>>>>>>> 7d9e19897b2d88cc8199d5ecf31a72dfc227593f


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'contrato-detail/:id', component: ContratoDetailComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'cargo-detail/:id', component: CargoDetailComponent },
<<<<<<< HEAD
  { path: 'roles-pago', component: RolesPagoComponent },
  { path: 'rolPago-detail/:id', component: RolPagoDetailComponent },
=======
  { path: 'empleado-detail/:id', component: EmpleadoDetailComponent },
  { path: 'rolPago', component: RolesPagoComponent },
>>>>>>> 7d9e19897b2d88cc8199d5ecf31a72dfc227593f
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }