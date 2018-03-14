import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent }   from './components/empleados/empleados.component';


const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NominasRoutingModule {}
