import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { authorDto, authorQueryFilter } from '@interfaces/author.interface';
import { AuthorsService } from '@services/authors.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CatalogueService } from '@services/catalogue.service';
import { catalogueInterface } from '@interfaces/commons.interface';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { OnlyNumberInputModule } from '@directives/onlyNumberDir/only-number-input.module';
import { formIsEmptyValidator } from '@utilsFunctions/utils';
import { AuthService } from '@services/auth.service';

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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputAutocompleteComponent,
  ],
  templateUrl: './author-home.component.html',
  styleUrl: './author-home.component.scss',
})
export class AuthorHomeComponent implements OnInit {
  constructor(
    private authorSvc: AuthorsService,
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private authSvc: AuthService
  ) {}
  listAuthors: authorDto[] = [];
  sizeAuthors: number = 0;
  indexPage: number = 0;
  pageSize: number = 10;
  countriesOpts: catalogueInterface[] = [];
  urlCatalogue = 'country';
  canAddAuthor: boolean = false;
  form: FormGroup = this.fb.group(
    {
      nameCont: [],
      birthDateGreat: [],
      birthDateSmall: [],
      countryId: [],
    },
    { validators: formIsEmptyValidator() }
  );
  formValues: authorQueryFilter = {};
  cleanFilters() {
    this.form.patchValue({
      nameCont: null,
      birthDateGreat: null,
      birthDateSmall: null,
      countryId: null,
    });
    this.formValues = {};
    this.getAuthors(1, 10);
  }

  searchAuthors() {
    this.formValues = this.form.value;
    if (this.formValues.birthDateSmall)
      this.formValues.birthDateSmall.setHours(23, 59, 59, 999);

    this.getAuthors(1, 10);
  }

  ngOnInit(): void {
    if (this.authSvc.getAuth())
      this.canAddAuthor = this.authSvc
        .getAuth()!
        .roles.includes('ADMINISTRATOR');
    this.getAuthors(1, 10);
    this.catalogueSvc.get(this.urlCatalogue, 1, 10).subscribe((countries) => {
      this.countriesOpts = countries.items;
    });
  }
  getAuthors(pageNumber: number, pageSize: number) {
    this.authorSvc.getAuthors(pageSize, pageNumber, this.formValues).subscribe(
      (res) => {
        this.listAuthors = res.items;
        this.sizeAuthors = res.total;
      },
      (error) => {
        this.formValues = {};
      }
    );
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
