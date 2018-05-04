import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from "@angular/http";
import { services, enums } from "../../credentials";
import { Menu } from '../models/menu';
import { SharedService } from '../../shared/services/shared.service';
import "rxjs/add/operator/map";
@Injectable()
export class MenuService extends SharedService {
  private menus: Menu[] = []
  constructor(private http: Http) {
    super();
  }

  /**
   * Permite obtener una lista de menus y almacenarlos en el storage del cliente.
   * @param token 
   */
  cargarMenus(token) {
    return this.http.get(services.ws_seguridad_menus, this.options(token, null, null, null, null)).subscribe(res => {
      this.menus = []
      res.json().data.forEach(element => {
        let menu = new Menu();
        menu.codigo = element.codigo
        menu.descripcion = element.descripcion
        menu.empresa = element.empresa
        menu.estado = element.estado
        menu.formulario = element.formulario
        menu.icono = element.icono
        menu.nombre = element.nombre
        menu.submenus = element.submenus;
        if (Number(element.orden) == 1) {
          menu.activate = true;
        }
        menu.orden = element.orden
        this.menus.push(menu)
      })
      localStorage.setItem(enums.SISTEMA_MENUS, JSON.stringify(this.menus))
    });

  }
  /**
   * Devolver una lista de menus.
   */
  public getMenus() {
    if (this.menus) {
      return this.menus;
    }
    return JSON.parse(localStorage.getItem(enums.SISTEMA_MENUS))
  }
  public setMenus(menus) {
    this.menus = menus;
  }
  /**
   * 
   * @param menuEdit 
   * @param url 
   */
  public updateActivateMenus(menuEdit, url) {

    this.menus.forEach(menu => {
      if (menu == menuEdit) {
        menu.activate = true;
      } else {
        menu.activate = false
      }
    });
    localStorage.setItem(enums.SISTEMA_MENUS, JSON.stringify(this.menus))
  }
  public getMenuByFormulario(url) {
    let index = url.search("/")
    let menu: Menu;
    url = url.substring(0, index)
    this.getMenus().forEach(element => {
      if (element.formulario == url) {
        menu = element;
      }
    });
    return menu;
  }
  /**
   * Permite devolver el menu actual seleccionad por una session de usuario.
   * @param token 
   */
  public getMenuActual(token) {
    let urlCurrent = null;
    let menusStorage = JSON.parse(localStorage.getItem(enums.SISTEMA_MENUS));
    if (!menusStorage) {
      this.cargarMenus(token.token);
    } else {
      menusStorage.forEach(element => {
        if (element.activate) {
          urlCurrent = element.formulario;
        }
      });
      this.setMenus(menusStorage);
    }
    return urlCurrent;
  }
  public hasPermission(token, menuCodigo) {
    return this.http.get(services.ws_seguridad_menus_haspermission, this.options(token, menuCodigo, null, null, null))
  }
}
