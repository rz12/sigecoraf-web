import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { CargosComponent } from './components/cargos/cargos.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';
import { ContratoDetailComponent } from './components/contrato-detail/contrato-detail.component';
import { RolPagoDetailComponent } from './components/rol-pago-detail/rol-pago-detail.component';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { ConsolidadoRolPagoListComponent } from './components/consolidado-rol-pago-list/consolidado-rol-pago-list.component';
import { ConsolidadoRolPagoDetailComponent } from './components/consolidado-rol-pago-detail/consolidado-rol-pago-detail.component';
import { EmpleadoResolveService } from './resolvers/empleado-resolve.service';


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'contrato-detail/:id', component: ContratoDetailComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'cargo-detail/:id', component: CargoDetailComponent },
  { path: 'rolPago-detail/:id', component: RolPagoDetailComponent },
  {
    path: 'empleado-detail/:id', component: EmpleadoDetailComponent, resolve: {
      empleado: EmpleadoResolveService
    }
  },
  { path: 'consolidado-rolpago', component: ConsolidadoRolPagoListComponent },
  { path: 'consolidado-rolpago-detail/:id', component: ConsolidadoRolPagoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }