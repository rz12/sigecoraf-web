import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Empleado } from '../models/empleado';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class EmpleadoService {
  private heroesUrl = 'http://localhost:8000/api/v1/nominas/empleados';
  constructor(private http: HttpClient) { }
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.heroesUrl)
      .pipe(
        tap(empleados => this.log(`fetched empleados`)),
        catchError(this.handleError('getHeroes', []))
      );
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {


  }
}
