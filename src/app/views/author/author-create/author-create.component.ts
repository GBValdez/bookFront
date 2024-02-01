import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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
import { authorCreation } from '@interfaces/author.interface';
import { catalogueInterface } from '@interfaces/commons.interface';
import { AuthorsService } from '@services/authors.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { FormAuthorComponent } from '../components/form-author/form-author.component';

@Component({
  selector: 'app-author-create',
  standalone: true,
  imports: [FormAuthorComponent],
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.scss',
})
export class AuthorCreateComponent {
  constructor(private route: Router, private authorSvc: AuthorsService) {}

  save(newAuth: authorCreation) {
    this.authorSvc.createAuthor(newAuth).subscribe(async (res) => {
      await Swal.fire({
        title: 'Operación realizada con éxito',
        text: 'El autor ha sido creado con éxito',
        icon: 'success',
      });
      this.route.navigate(['/authors']);
    });
  }
}
