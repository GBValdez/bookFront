import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { bookDto } from '@interfaces/book.interface';
import { BookService } from '@services/book.service';
import { CommentsService } from '@services/comments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    DatePipe,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  id!: number;
  form: FormGroup = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(600)]],
  });

  constructor(
    private bookSvc: BookService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private commentSvc: CommentsService
  ) {}
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    this.getBook();
  }
  book!: bookDto;
  getBook() {
    this.bookSvc.get(this.id, true).subscribe((book) => {
      this.book = book;
      console.log(book);
    });
  }
  async deleteBook() {
    const result = await Swal.fire({
      title: `'¿Desea eliminar el autor "${this.book.title}"?'`,
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (result.isConfirmed) {
      this.bookSvc.delete(this.book.id).subscribe(async (res) => {
        await Swal.fire({
          title: 'El autor fue eliminado correctamente',
          icon: 'success',
        });
        this.router.navigate(['/books']);
      });
    }
  }
  async sendComment() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    const result = await Swal.fire({
      title: '¿Desea enviar el comentario?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (result.isConfirmed) {
      this.commentSvc.post(this.form.value, this.id).subscribe((res) => {
        this.getBook();
        this.form.patchValue({ comment: '' });
        Swal.fire({
          title: 'El comentario fue enviado correctamente',
          icon: 'success',
        });
      });
    }
  }
}
