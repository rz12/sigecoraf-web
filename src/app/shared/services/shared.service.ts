import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { element } from 'protractor';
@Injectable()
export class SharedService {

  constructor() { }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  options(token, menuCodigo, page, pageSize, filter, paramOptional = []) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);

    let parametros: URLSearchParams = new URLSearchParams();
    parametros.set("PAGE", page);
    parametros.set("PAGE_SIZE", pageSize);
    parametros.set("FILTER", filter);
    parametros.set("MENU", menuCodigo);
    if (paramOptional) {
      paramOptional.forEach(element => {
        parametros.set(Object.keys(element)[0], element[Object.keys(element)[0]])
      });
    }
    return new RequestOptions({ headers: headers, search: parametros });
  }
  public getIndexObject(data = [], object) {
    return data.findIndex(function (element) {
      return object.id == element.id;
    });
  }
}
