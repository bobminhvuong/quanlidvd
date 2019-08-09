import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter = JSON.stringify(filter);
    const url = this.mainSV.host();
    return this.http.get(url + '/catalog?filter=' + filter).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteCatalog(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/catalog/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createCatalog(catalog): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/catalog', catalog, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateCatalog(catalog): Observable<any> {
    const url = this.mainSV.host();
    return this.http.put(url + '/catalog/' + catalog.id, catalog, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getByIdCatalog(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/catalog/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
