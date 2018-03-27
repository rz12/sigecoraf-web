import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services } from "../../credentials";
import { Parametrizacion } from "../../master/models/parametrizacion";
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import "rxjs/Rx";
@Injectable()
export class ParametrizacionService {
  public parametrizaciones: Parametrizacion[]
  constructor(private http: Http) { }
  getParametrizaciones(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_master_parametrizaciones, options).pipe(
      catchError(this.handleError('addHero', token))
    );
  }
  private log(message: string) {

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
