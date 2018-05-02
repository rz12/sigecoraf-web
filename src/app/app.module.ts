import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SeguridadModule } from './seguridad/seguridad.module';
import { NominasModule } from './nominas/nominas.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from "./home/home.module";
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HttpClientModule } from '@angular/common/http';
import { ParametrizacionService } from './master/services/parametrizacion.service';
import { SeguridadService } from './seguridad/services/seguridad.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { MenuService } from './seguridad/services/menu.service';
import { SideNavService } from "./shared/services/side-nav.service";
import { UsuarioService } from './seguridad/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'YYYY-MMMM-dd',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY-MMMM-dd',
  },
};
@NgModule({
  declarations: [
    AppComponent, DashboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SeguridadModule,
    NominasModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule, MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [ParametrizacionService, UsuarioService, MenuService, SideNavService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
  bootstrap: [AppComponent]
})
export class AppModule { }
