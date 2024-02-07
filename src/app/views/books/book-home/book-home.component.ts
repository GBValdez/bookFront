import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '@services/book.service';
import { bookDto, bookQueryFilter } from '@interfaces/book.interface';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { CatalogueService } from '@services/catalogue.service';
import { catalogueInterface } from '@interfaces/commons.interface';
import { MatSelectModule } from '@angular/material/select';

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
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputAutocompleteComponent,
    MatSelectModule,
  ],
  templateUrl: './book-home.component.html',
  styleUrl: './book-home.component.scss',
})
export class BookHomeComponent {
  constructor(
    private bookSvc: BookService,
    private router: Router,
    private fb: FormBuilder,
    private catalogueSvc: CatalogueService
  ) {}
  bookList: bookDto[] = [];
  indexPage: number = 0;
  pageSize: number = 10;
  sizeBooks: number = 0;
  languagesOpts: catalogueInterface[] = [];
  categoriesOpts: catalogueInterface[] = [];
  form: FormGroup = this.fb.group({
    titleCont: [],
    dateCreationGreat: [],
    dateCreationSmall: [],
    numPages: [],
    languageId: [],
    categoriesId: [],
  });
  formValue: bookQueryFilter = {};
  cleanFilters() {
    this.form.patchValue({
      titleCont: '',
      dateCreationGreat: '',
      dateCreationSmall: '',
      numPages: '',
      languageId: '',
      categoriesId: '',
    });
    this.formValue = {};
    this.getBooks(1, 10);
  }
  searchBooks() {
    this.formValue = this.form.value;
    if (this.formValue.dateCreationGreat) {
      this.formValue.dateCreationGreat.setHours(23, 59, 59, 999);
    }
    console.log('limpia', this.formValue);

    this.getBooks(1, 10);
  }

  ngOnInit(): void {
    this.getBooks(1, 10);
    this.catalogueSvc.get('language').subscribe((res) => {
      this.languagesOpts = res;
    });
    this.catalogueSvc.get('category').subscribe((res) => {
      this.categoriesOpts = res;
    });
  }
  changePagination(event: PageEvent) {
    this.indexPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBooks(event.pageIndex + 1, event.pageSize);
  }

  getBooks(pageNumber: number, pageSize: number) {
    console.log('valores', this.formValue);
    this.bookSvc.getAll(pageNumber, pageSize, this.formValue).subscribe(
      (res) => {
        this.bookList = res.items;
        this.sizeBooks = res.total;
        console.log('xd', this.bookList);
      },
      (error) => {
        this.formValue = {};
      }
    );
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
