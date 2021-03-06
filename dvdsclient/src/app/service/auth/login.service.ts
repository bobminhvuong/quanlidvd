import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  login(data): Observable<any> {
    const host = this.mainSV.host();
    return this.http.post(host + '/auth/login', data, this.mainSV.getHttpOptionsNotToken())
      .pipe(
        catchError(this.mainSV.handleError)
      );
  }
}
