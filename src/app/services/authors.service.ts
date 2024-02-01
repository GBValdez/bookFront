import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { authorCreation, authorDto } from '@interfaces/author.interface';
import { pagDto } from '@interfaces/commons.interface';
import { fixedQueryParams } from '@utilsFunctions/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private urlBase: string = `${environment.api}/authors`;
  constructor(private http: HttpClient) {}
  getAuthors(
    pageSize: number,
    pageNumber: number
  ): Observable<pagDto<authorDto>> {
    return this.http.get<pagDto<authorDto>>(this.urlBase, {
      params: {
        pageSize,
        pageNumber,
      },
    });
  }
  getAuthorById(id: number, all?: boolean): Observable<authorDto> {
    const params: any = fixedQueryParams({ all });
    return this.http.get<authorDto>(`${this.urlBase}/${id}`, {
      params,
    });
  }

  getAuthorByName(name: string): Observable<authorDto[]> {
    return this.http.get<authorDto[]>(`${this.urlBase}/byName`, {
      params: {
        name,
      },
    });
  }

  updateAuthor(id: number, author: authorCreation) {
    return this.http.put(`${this.urlBase}/${id}`, author);
  }

  createAuthor(newAuthor: authorCreation) {
    return this.http.post(this.urlBase, newAuthor);
  }
  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
