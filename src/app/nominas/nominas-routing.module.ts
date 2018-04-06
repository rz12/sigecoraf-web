import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CargosComponent } from './components/cargos/cargos.component';


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'cargos', component: CargosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NominasRoutingModule { }
