import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catalogueInterface, pagDto } from '@interfaces/commons.interface';
import { fixedQueryParams } from '@utilsFunctions/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  private baseUrl: string = environment.api;
  constructor(private http: HttpClient) {}
  get(
    catalogue: string,
    pageNumber: number,
    pageSize: number,
    all: boolean = true
  ): Observable<pagDto<catalogueInterface>> {
    const params: any = fixedQueryParams({ all });
    return this.http.get<pagDto<catalogueInterface>>(
      `${this.baseUrl}/${catalogue}`,
      {
        params,
      }
    );
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
