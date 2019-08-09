import { Injectable } from '@angular/core';
import { MainService } from './../main.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  createInvoice(invoice): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/order', invoice, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
