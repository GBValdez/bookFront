import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { authorCreation, authorDto } from '@interfaces/author.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private urlBase: string = `${environment.api}/authors`;
  constructor(private http: HttpClient) {}
  getAuthors(): Observable<authorDto[]> {
    return this.http.get<authorDto[]>(this.urlBase);
  }
  getAuthorById(id: string) {
    return this.http.get(`${this.urlBase}/${id}`);
  }
  getAuthorByName(name: string) {
    return this.http.get(`${this.urlBase}/byName`, {
      params: {
        name,
      },
    });
  }
  createAuthor(newAuthor: authorCreation) {
    return this.http.post(this.urlBase, newAuthor);
  }
}
