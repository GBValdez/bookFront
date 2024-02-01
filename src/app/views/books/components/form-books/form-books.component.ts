import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-form-books',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    InputAutocompleteComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-books.component.html',
  styleUrl: './form-books.component.scss',
})
export class FormBooksComponent {
  constructor(private fb: FormBuilder) {}
  form: FormGroup = this.fb.group({
    title: [''],
    dateCreation: [''],
    numPages: [''],
    languageId: [''],
    description: [''],
  });
}
