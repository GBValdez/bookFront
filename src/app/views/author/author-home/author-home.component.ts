import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { authorDto } from '@interfaces/author.interface';
import { AuthorsService } from '@services/authors.service';

@Component({
  selector: 'app-author-home',
  standalone: true,
  imports: [MatCardModule, DatePipe, MatButtonModule, RouterModule],
  templateUrl: './author-home.component.html',
  styleUrl: './author-home.component.scss',
})
export class AuthorHomeComponent implements OnInit {
  constructor(private authorSvc: AuthorsService) {}
  listAuthors: authorDto[] = [];
  ngOnInit(): void {
    this.authorSvc.getAuthors().subscribe((res) => {
      this.listAuthors = res;
    });
  }
}
