import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpleadosComponent }   from './components/empleados/empleados.component';


const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class NominasRoutingModule {}
