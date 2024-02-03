import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '@services/book.service';
import { bookDto } from '@interfaces/book.interface';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-book-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    DatePipe,
    MatIconModule,
    MatPaginatorModule,
    MatChipsModule,
  ],
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.scss',
})
export class BookHomeComponent {
  constructor(private bookSvc: BookService, private router: Router) {}
  bookList: bookDto[] = [];
  indexPage: number = 0;
  pageSize: number = 10;
  sizeBooks: number = 0;
  ngOnInit(): void {
    this.getBooks(1, 10);
  }
  changePagination(event: PageEvent) {
    this.indexPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBooks(event.pageIndex + 1, event.pageSize);
  }

  getBooks(pageNumber: number, pageSize: number) {
    this.bookSvc.getAll(pageNumber, pageSize).subscribe((res) => {
      this.bookList = res.items;
      this.sizeBooks = res.total;
    });
  }
  async deleteBook(book: bookDto) {
    const result = await Swal.fire({
      title: `'¿Desea eliminar el libro "${book.title}"?'`,
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (result.isConfirmed) {
      this.bookSvc.delete(book.id).subscribe((res) => {
        this.getBooks(this.indexPage + 1, this.pageSize);
        Swal.fire({
          title: 'El libro fue eliminado correctamente',
          icon: 'success',
        });
      });
    }
  }
}
