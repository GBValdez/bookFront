import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { ListMakerListComponent } from '@components/list-maker-list/list-maker-list.component';
import { catalogueInterface } from '@interfaces/commons.interface';
import { AuthorsService } from '@services/authors.service';
import { CatalogueService } from '@services/catalogue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-books',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ListMakerListComponent,
    InputAutocompleteComponent,
  ],
  templateUrl: './form-books.component.html',
  styleUrl: './form-books.component.scss',
})
export class FormBooksComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authorSvc: AuthorsService,
    private catalogueSvc: CatalogueService
  ) {}
  ngOnInit(): void {
    this.catalogueSvc.get('language').subscribe((res) => {
      this.optLanguages = res;
    });
  }
  urlCatalogue = 'language';
  optLanguages: catalogueInterface[] = [];
  optAuthors: catalogueInterface[] = [];
  form: FormGroup = this.fb.group({
    title: [''],
    dateCreation: [''],
    numPages: [''],
    languageId: [''],
    description: [''],
    authorIds: [''],
    categoriesIds: [''],
  });

  foundingAuthor(value: string): void {
    if (value.trim() === '') return;
    this.authorSvc.getAuthorByName(value).subscribe((res) => {
      this.optAuthors = res.map((author) => {
        return { id: author.id, name: author.name };
      });
    });
  }
  async noExistLanguage(language: string) {
    const RES = await Swal.fire({
      title: `No existe el idioma "${language}"`,
      text: '¿Desea agregarlo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (RES.isConfirmed)
      this.catalogueSvc
        .create({ name: language }, this.urlCatalogue)
        .subscribe((res) => {
          this.optLanguages = [...this.optLanguages, res];
          this.form.patchValue({ languageId: res.id });
          Swal.fire({
            title: 'Idioma agregado',
            text: 'El Idioma ha sido agregado',
            icon: 'success',
            timer: 2000,
          });
        });
  }
}
