import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { RolesPagoComponent } from './components/roles-pago/roles-pago.component';


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'rolPago', component: RolesPagoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }
