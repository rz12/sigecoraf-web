import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
import { catchError, map, tap } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { Http } from '@angular/http';
import { services, enums } from '../../credentials';
@Injectable()
export class EmpleadoService extends SharedService {
    constructor(private http: Http) {
        super()
    }
    empleadosList(token, page, pageSize, filter) {
        return this.http.get(services.ws_nominas_empleados, this.options(token, enums.MENU_EMPLEADOS, page, pageSize, filter))
    }
    save(token, data) {

        let body = JSON.stringify(data);
        let options = this.options(token, null, null, null, "");
        if (!data.id) {

            return this.http.post(services.ws_nominas_empleados, body, options).map(res => res.json())
        }
        return this.http.put(services.ws_nominas_empleados.concat('/').concat(data.id), body, options).map(res =>
            res.json())
    }
    public getEmpleado(token, id) {
        return this.http.get(services.ws_nominas_empleados.concat('/').concat(id), this.options(token, null, null, null, ""))
    }
}
