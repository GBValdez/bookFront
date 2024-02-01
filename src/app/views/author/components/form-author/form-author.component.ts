import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { authorCreation } from '@interfaces/author.interface';
import { catalogueInterface } from '@interfaces/commons.interface';
import { AuthorsService } from '@services/authors.service';
import { CatalogueService } from '@services/catalogue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-author',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    InputAutocompleteComponent,
  ],
  templateUrl: './form-author.component.html',
  styleUrl: './form-author.component.scss',
})
export class FormAuthorComponent {
  @Output() saveAuthorEvent: EventEmitter<authorCreation> = new EventEmitter();
  countriesOpts: catalogueInterface[] = [];
  form: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[A-Z]/),
      ],
    ],
    birthDate: ['', [Validators.required]],
    countryId: ['', [Validators.required]],
    biography: ['', [Validators.required, Validators.maxLength(500)]],
  });
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authorSvc: AuthorsService,
    private catalogueSvc: CatalogueService
  ) {}
  urlCatalogue = 'country';
  ngOnInit(): void {
    this.catalogueSvc.get(this.urlCatalogue).subscribe((countries) => {
      this.countriesOpts = countries;
    });
  }

  async noExistCountry(country: string) {
    const RES = await Swal.fire({
      title: `No existe el país "${country}"`,
      text: '¿Desea agregarlo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (RES.isConfirmed)
      this.catalogueSvc
        .create({ name: country }, this.urlCatalogue)
        .subscribe((res) => {
          this.countriesOpts = [...this.countriesOpts, res];
          this.form.patchValue({ countryId: res.id });
          Swal.fire({
            title: 'País agregado',
            text: 'El país ha sido agregado',
            icon: 'success',
            timer: 2000,
          });
        });
  }

  clean(): void {
    console.log(this.form.value);
    this.form.patchValue({
      name: '',
      birthDate: '',
      countryId: '',
      biography: '',
    });
  }
  cancel(): void {
    this.route.navigate(['/authors']);
  }

  async save() {
    if (this.form.valid) {
      const RES = await Swal.fire({
        title: '¿Está seguro?',
        text: '¿Desea guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      });
      if (RES.isConfirmed) this.saveAuthorEvent.emit(this.form.value);
    } else this.form.markAllAsTouched();
  }
}
