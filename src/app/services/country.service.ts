import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catalogueInterface } from '@interfaces/commons.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl: string = `${environment.api}/country`;
  constructor(private http: HttpClient) {}
  getCountries(): Observable<catalogueInterface[]> {
    return this.http.get<catalogueInterface[]>(`${this.baseUrl}`);
  }

  createCountry(
    newCountry: catalogueInterface
  ): Observable<catalogueInterface> {
    return this.http.post<catalogueInterface>(`${this.baseUrl}`, newCountry);
  }
}
