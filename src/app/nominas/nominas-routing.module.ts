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
import { CargoDetailResolveService } from './resolvers/cargo-detail-resolve.service';
import { ConsolidadoRolPagoService } from './services/consolidado-rol-pago.service';
import { ConsolidadoRolpagoDetailResolveService } from './resolvers/consolidado-rolpago-detail-resolve.service';
import { CargoListResolveService } from './resolvers/cargo-list-resolve.service';
import { EmpleadoListResolveService } from './resolvers/empleado-list-resolve.service';
import { ContratoListResolveService } from './resolvers/contrato-list-resolve.service';
import { ContratoDetailResolveService } from './resolvers/contrato-detail-resolve.service';
import { ConsolidadoRolPagoListResolveService } from './resolvers/consolidado-rol-pago-list-resolve.service';


const routes: Routes = [
  {
    path: 'empleados',
    component: EmpleadosComponent,
    resolve: { data: EmpleadoListResolveService },
    canActivate: [EmpleadoListResolveService]
  },
  {
    path: 'contratos',
    component: ContratosComponent,
    resolve: { data: ContratoListResolveService },
    canActivate: [ContratoListResolveService]
  },
  {
    path: 'contrato-detail/:id',
    component: ContratoDetailComponent,
    resolve: { data: ContratoDetailResolveService },
    canActivate: [ContratoDetailResolveService]
  },
  {
    path: 'cargos',
    component: CargosComponent,
    resolve: { data: CargoListResolveService },
    canActivate: [CargoListResolveService]
  },
  {
    path: 'cargo-detail/:id',
    component: CargoDetailComponent,
    resolve: { cargoData: CargoDetailResolveService },
    canActivate: [CargoDetailResolveService]
  },
  { path: 'rolPago-detail/:id', component: RolPagoDetailComponent },
  {
    path: 'empleado-detail/:id',
    component: EmpleadoDetailComponent,
    resolve: { empleadoData: EmpleadoResolveService },
    canActivate: [EmpleadoResolveService],
  },
  {
    path: 'consolidado-rolpago',
    component: ConsolidadoRolPagoListComponent,
    resolve: { data: ConsolidadoRolPagoListResolveService },
    canActivate: [ConsolidadoRolPagoListResolveService]
  },
  {
    path: 'consolidado-rolpago-detail/:id',
    component: ConsolidadoRolPagoDetailComponent,
    resolve: {
      data: ConsolidadoRolpagoDetailResolveService
    },
    canActivate: [ConsolidadoRolpagoDetailResolveService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }