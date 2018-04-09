import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services, enums } from "../../credentials";
import { IMenu } from '../dto/i-menu';
import { Menu } from '../models/menu';

@Injectable()
export class MenuService {
  private menus: Menu[]
  constructor(private http: Http) {
    this.menus = [];
  }

  cargarMenus(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_seguridad_menus, options).subscribe(res => {
      res.json().data.forEach(element => {
        let menu = new Menu();
        menu.codigo = element.codigo
        menu.descripcion = element.descripcion
        menu.empresa = element.empresa
        menu.estado = element.estado
        menu.formulario = element.formulario
        menu.icono = element.icono
        menu.nombre = element.nombre
        if (Number(element.orden) == 1) {
          menu.activate = true;
        }
        menu.orden = element.orden
        this.menus.push(menu)
      })
      localStorage.setItem(enums.SISTEMA_MENUS, JSON.stringify(this.menus))
    });

  }
  public getMenus() {
    return this.menus;
  }
  public setMenus(menus) {
    this.menus = menus;
  }
}
