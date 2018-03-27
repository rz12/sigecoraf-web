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

@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule
  ],
  providers: [ParametrizacionService, SeguridadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
