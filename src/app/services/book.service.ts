import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { bookCreationDto, bookDto } from '@interfaces/book.interface';
import { fixedQueryParams } from '@utilsFunctions/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private urlBase: string = `${environment.api}/books`;
  constructor(private httpClient: HttpClient) {}
  getAll() {
    return this.httpClient.get(`${this.urlBase}`);
  }
  get(id: number, all?: boolean): Observable<bookDto> {
    const params: any = fixedQueryParams({ all });
    return this.httpClient.get<bookDto>(`${this.urlBase}/${id}`, {
      params,
    });
  }
  post(data: bookCreationDto) {
    return this.httpClient.post(`${this.urlBase}`, data);
  }
}
