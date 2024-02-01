import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBooksComponent } from '../components/form-books/form-books.component';
import { bookCreationDto } from '@interfaces/book.interface';
import { BookService } from '@services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [FormBooksComponent],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss',
})
export class BookEditComponent implements OnInit {
  @ViewChild(FormBooksComponent) formBook!: FormBooksComponent;

  id!: number;
  constructor(private bookSvc: BookService, private actRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    console.log('id', this.id);
    this.bookSvc.get(this.id).subscribe((res) => {
      this.formBook.form.patchValue({
        title: res.title,
        dateCreation: res.dateCreation,
        numPages: res.numPages,
        languageId: res.language.id,
        description: res.description,
        authorIds: res.authors.map((x) => x.id),
        categoryId: res.categories.map((x) => x.id),
      });
    });
  }
  save(newBook: bookCreationDto) {}
}
