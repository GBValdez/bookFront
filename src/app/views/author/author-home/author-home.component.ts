import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { authorDto } from '@interfaces/author.interface';
import { AuthorsService } from '@services/authors.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-home',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './author-home.component.html',
  styleUrl: './author-home.component.scss',
})
export class AuthorHomeComponent implements OnInit {
  constructor(private authorSvc: AuthorsService) {}
  listAuthors: authorDto[] = [];
  sizeAuthors: number = 0;
  indexPage: number = 0;
  pageSize: number = 10;
  ngOnInit(): void {
    this.getAuthors(1, 10);
  }
  getAuthors(pageNumber: number, pageSize: number) {
    this.authorSvc.getAuthors(pageSize, pageNumber).subscribe((res) => {
      this.listAuthors = res.items;
      this.sizeAuthors = res.total;
    });
  }
  changePagination(event: PageEvent) {
    this.indexPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAuthors(event.pageIndex + 1, event.pageSize);
  }
  async deleteAuthor(author: authorDto) {
    const result = await Swal.fire({
      title: `'¿Desea eliminar el autor "${author.name}"?'`,
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (result.isConfirmed) {
      this.authorSvc.deleteAuthor(author.id).subscribe((res) => {
        this.getAuthors(this.indexPage + 1, this.pageSize);
        Swal.fire({
          title: 'El autor fue eliminado correctamente',
          icon: 'success',
        });
      });
    }
  }
}
