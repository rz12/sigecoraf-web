import { Injectable } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { Http } from '@angular/http';
import { services } from "../../credentials";
@Injectable()
export class CatalogoService extends SharedService {

  constructor(private http: Http) {
    super();
  }
  public catalogosList(token) {
    return this.http.get(services.ws_master_catalogos, this.options(token, null, null, null, null));
  }
  public catalogosListByCodigo(token, codigo) {
    let paramsOptional = []
    paramsOptional.push(codigo)
    return this.http.get(services.ws_master_catalogos_list_by_codigo, this.options(token, null, null, null, null, paramsOptional));
  }
}
