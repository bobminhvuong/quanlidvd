import { MainService } from './../main.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DvdDetailService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter = JSON.stringify(filter);
    const url = this.mainSV.host();
    return this.http.get(url + '/dvdDetail?filter=' + filter).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteDvdDetail(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/dvdDetail/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createDvdDetail(dvd): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/dvdDetail', dvd, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateDvdDetail(dvd): Observable<any> {
    const url = this.mainSV.host();
    return this.http.put(url + '/dvdDetail/' + dvd.id, dvd, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getById(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/dvdDetail/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
