import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services } from "../../credentials";

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  autenticate(usercreds) {
    return new Promise((resolve) => {
      let credenciales = 'username=' + usercreds.username + '&password=' + usercreds.password;
      let headers = new Headers();
      headers.append('Content-Type', 'application/X-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      this.http.post(services.ws_seguridad_login, credenciales, options).subscribe((data) => {
        if (data.json()) {
          console.log(data.json())
          window.localStorage.setItem('auth_key', data.json().token);
          resolve(true)
        }
      }, (err) => resolve(false)
      )
    });
  }
}
