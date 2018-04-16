import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Http } from '@angular/http';
import { services } from '../../credentials';

@Injectable()
export class DireccionService extends SharedService {

  constructor(private http: Http) {
    super();
  }
  direccionesLisByPersona(persona, token, page, pageSize, filter) {
    let opciones = []
    let opcion = { "PERSONA": persona }
    opciones.push(opcion)
    return this.http.get(services.ws_master_direcciones, this.options(token, null, page, pageSize, filter, opciones))
  }
  save(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (!data.id) {
      return this.http.post(services.ws_master_direcciones, body, options).map(res => res.json())
    }
    return this.http.put(services.ws_master_direcciones.concat('/').concat(data.id), body, options).map(res =>
      res.json())
  }
  delete(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (data.id) {
      return this.http.delete(services.ws_master_direcciones.concat("/").concat(data.id), options).map(res => res.json())
    }
  }
}
