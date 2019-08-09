import { HttpClient } from '@angular/common/http';
import { MainService } from './../main.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DvdService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter = JSON.stringify(filter);
    const url = this.mainSV.host();
    return this.http.get(url + '/dvd?filter=' + filter).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteDvd(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/dvd/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createDvd(dvd): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/dvd', dvd, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateDvd(dvd): Observable<any> {
    const url = this.mainSV.host();
    return this.http.put(url + '/dvd/' + dvd.id, dvd, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getByIdDvd(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/dvd/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
