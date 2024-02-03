import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { authorDto } from '@interfaces/author.interface';
import { AuthorsService } from '@services/authors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    MatChipsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss',
})
export class AuthorDetailComponent implements OnInit {
  constructor(
    private authorSvc: AuthorsService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}
  public author!: authorDto;
  ngOnInit(): void {
    const id = this.actRoute.snapshot.params['id'];
    this.authorSvc.getAuthorById(id, true).subscribe((res) => {
      this.author = res;
      console.log(this.author);
    });
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
      this.authorSvc.deleteAuthor(author.id).subscribe(async (res) => {
        await Swal.fire({
          title: 'El autor fue eliminado correctamente',
          icon: 'success',
        });
        this.router.navigate(['/authors']);
      });
    }
  }
}
