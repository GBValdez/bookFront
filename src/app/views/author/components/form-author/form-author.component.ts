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
import { CountryService } from '@services/country.service';
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
  countriesOptsFilter: string[] = [];
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
    country: ['', [Validators.required]],
    biography: ['', [Validators.required, Validators.maxLength(500)]],
  });
  constructor(
    private fb: FormBuilder,
    private countrySvc: CountryService,
    private route: Router,
    private authorSvc: AuthorsService
  ) {}
  ngOnInit(): void {
    this.countrySvc.getCountries().subscribe((countries) => {
      this.countriesOpts = countries;
      this.countriesOptsFilter = countries.map((country) => country.name);
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
      this.countrySvc.createCountry({ name: country }).subscribe((res) => {
        this.countriesOpts = [...this.countriesOpts, res];
        this.countriesOptsFilter = [...this.countriesOptsFilter, res.name];
        this.form.patchValue({ country: res.name });
        Swal.fire({
          title: 'País agregado',
          text: 'El país ha sido agregado',
          icon: 'success',
          timer: 2000,
        });
      });
  }

  clean(): void {
    this.form.patchValue({
      name: '',
      birthDate: '',
      country: '',
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
      if (RES.isConfirmed) {
        const ID_COUNTRY: number = this.countriesOpts.find(
          (country) => country.name === this.form.value.country
        )!.id!;
        const NEW_AUTHOR: authorCreation = this.form.value;
        NEW_AUTHOR.countryId = ID_COUNTRY;
        this.saveAuthorEvent.emit(NEW_AUTHOR);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
