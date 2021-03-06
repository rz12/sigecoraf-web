import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NominasRoutingModule } from './nominas-routing.module';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CargosComponent } from './components/cargos/cargos.component';
import { CargoDetailComponent } from './components/cargo-detail/cargo-detail.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { ContratoDetailComponent } from './components/contrato-detail/contrato-detail.component';
import { CargoService } from './services/cargo.service';
import { ContratoService } from './services/contrato.service';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import {
  MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatFormField, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatSelectModule, MatPaginatorModule, MatGridListModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatTabsModule, MatAutocompleteModule
} from '@angular/material';
import { RolPago } from './models/rol-pago';
import { RolPagoService } from './services/rol-pago.service';
import { ToolBarAcctionComponent } from "../shared/components/tool-bar-action/tool-bar-action.component";
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmpresaService } from '../master/services/empresa.service';
import { SelectEmpresaComponent } from '../shared/components/select-empresa/select-empresa.component';
import { SearchComponent } from '../shared/components/search/search.component';
import { EmpleadoService } from './services/empleado.service';
import { SelectItemComponent } from '../shared/components/select-item/select-item.component';
import { CatalogoService } from '../master/services/catalogo.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DireccionService } from '../master/services/direccion.service';
import { DireccionesComponent } from '../master/components/direcciones/direcciones.component';
import { DireccionDetailDialogComponent } from '../master/components/direccion-detail-dialog/direccion-detail-dialog.component';
import { SharedService } from '../shared/services/shared.service';
import { ItemService } from '../master/services/item.service';
import { CargosAutcompleteComponent } from './components/cargos-autcomplete/cargos-autcomplete.component';
import { EmpleadosAutocompleteComponent } from './components/empleados-autocomplete/empleados-autocomplete.component';
import { ConsolidadoRolPagoListComponent } from './components/consolidado-rol-pago-list/consolidado-rol-pago-list.component';
import { ConsolidadoRolPagoDetailComponent } from './components/consolidado-rol-pago-detail/consolidado-rol-pago-detail.component';
import { ConsolidadoRolPagoService } from './services/consolidado-rol-pago.service';
import { RolPagoListComponent } from './components/rol-pago-list/rol-pago-list.component';
import { EmpleadoResolveService } from './resolvers/empleado-resolve.service';
import { CargoDetailResolveService } from './resolvers/cargo-detail-resolve.service';
import { ConsolidadoRolpagoDetailResolveService } from './resolvers/consolidado-rolpago-detail-resolve.service';
import { RolPagoDetailDialogComponent } from './components/rol-pago-detail-dialog/rol-pago-detail-dialog.component';
import { PaginationService } from '../shared/services/pagination.service';
import { CargoListResolveService } from './resolvers/cargo-list-resolve.service';
import { EmpleadoListResolveService } from './resolvers/empleado-list-resolve.service';
import { ContratoListResolveService } from './resolvers/contrato-list-resolve.service';
import { ContratoDetailResolveService } from './resolvers/contrato-detail-resolve.service';
import { ConsolidadoRolPagoListResolveService } from './resolvers/consolidado-rol-pago-list-resolve.service';
import { DetalleRolPagoListComponent } from './components/detalle-rol-pago-list/detalle-rol-pago-list.component';
import { DetalleRolPagoService } from './services/detalle-rol-pago.service';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NominasRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTabsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    CdkTableModule,
  ],

  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargosComponent, CargoDetailComponent, SelectEmpresaComponent,
    ContratosComponent, ContratoDetailComponent, RolPagoListComponent, ToolBarAcctionComponent, SearchComponent,
    SelectItemComponent, DireccionesComponent, DireccionDetailDialogComponent, CargosAutcompleteComponent,
    EmpleadosAutocompleteComponent,
    ConsolidadoRolPagoListComponent,
    ConsolidadoRolPagoDetailComponent,
    RolPagoListComponent,
    RolPagoDetailDialogComponent,
    DetalleRolPagoListComponent],
  entryComponents: [DireccionesComponent, DireccionDetailDialogComponent, RolPagoListComponent, RolPagoDetailDialogComponent],
  providers: [SharedService, CargoService, ContratoService, SeguridadService, RolPagoService, EmpresaService, CatalogoService,
    EmpleadoService, EmpleadoResolveService, CargoDetailResolveService, DireccionService, ItemService, ConsolidadoRolPagoService,
    ConsolidadoRolpagoDetailResolveService, CargoListResolveService, PaginationService, EmpleadoListResolveService, DetalleRolPagoService,
    ContratoDetailResolveService, ContratoListResolveService, ConsolidadoRolPagoListResolveService]
})
export class NominasModule { }
