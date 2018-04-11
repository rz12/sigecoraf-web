import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Headers, RequestOptions, URLSearchParams } from "@angular/http";
@Injectable()
export class SharedService {

  constructor() { }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  options(token, page, itemsPerPage) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);

    let parametros: URLSearchParams = new URLSearchParams();
    parametros.set("PAGE", page);
    parametros.set("ITEMS_PER_PAGE", itemsPerPage);
    return new RequestOptions({ headers: headers, search: parametros });

  }
}
