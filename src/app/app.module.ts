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
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent, DashboardComponent
  ],
  imports: [
    BrowserModule,
    SeguridadModule,
    NominasModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    HttpClientModule, MatToolbarModule
  ],
  providers: [ParametrizacionService, SeguridadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
