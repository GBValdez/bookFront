import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthorsService } from '@services/authors.service';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { FormBooksComponent } from '../components/form-books/form-books.component';
import { bookCreationDto } from '@interfaces/book.interface';
import { BookService } from '@services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [FormBooksComponent],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements OnInit {
  constructor(private bookSvc: BookService, private router: Router) {}

  ngOnInit(): void {}
  save(newBook: bookCreationDto) {
    this.bookSvc.post(newBook).subscribe(async (res) => {
      await Swal.fire(
        'Operación Realizada con éxito',
        'El libro ha sido creado',
        'success'
      );
      this.router.navigate(['/books']);
    });
  }
}
