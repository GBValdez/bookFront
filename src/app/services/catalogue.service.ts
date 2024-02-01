import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catalogueInterface } from '@interfaces/commons.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private baseUrl: string = environment.api;
  constructor(private http: HttpClient) {}
  get(catalogue: string): Observable<catalogueInterface[]> {
    return this.http.get<catalogueInterface[]>(`${this.baseUrl}/${catalogue}`);
  }

  create(
    newCatalogue: catalogueInterface,
    catalogue: string
  ): Observable<catalogueInterface> {
    return this.http.post<catalogueInterface>(
      `${this.baseUrl}/${catalogue}`,
      newCatalogue
    );
  }
}
