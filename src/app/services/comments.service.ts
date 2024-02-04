import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {
  commentsDto,
  commentsDtoCreation,
} from '@interfaces/comments.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private url = `${environment.api}/books`;

  constructor(private httpClient: HttpClient) {}
  post(comment: commentsDtoCreation, bookId: number): Observable<commentsDto> {
    return this.httpClient.post<commentsDto>(
      `${this.url}/${bookId}/comments`,
      comment
    );
  }
}
