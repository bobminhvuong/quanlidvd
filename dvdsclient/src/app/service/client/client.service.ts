import { Injectable } from '@angular/core';
import { MainService } from './../main.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter = JSON.stringify(filter);
    const url = this.mainSV.host();
    return this.http.get(url + '/client?filter=' + filter).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteClient(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/client/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createClient(client): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/client', client, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateClient(client): Observable<any> {
    const url = this.mainSV.host();
    return this.http.put(url + '/client/' + client.id, client, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getByIdClient(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/client/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
