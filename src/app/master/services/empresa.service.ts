import { Injectable } from '@angular/core';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { Http } from "@angular/http";
@Injectable()
export class EmpresaService extends SharedService {

  constructor(private http: Http) {
    super();
  }
  public empresaList(token) {
    return this.http.get(services.ws_master_empresas, this.options(token, null, null, null, null));
  }
  public getEmpresa(id) {
    return this.http.get(services.ws_master_empresas.concat('/').concat(id), this.options(null, null, null, null, ""))
  }
}
