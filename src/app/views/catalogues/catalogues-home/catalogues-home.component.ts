import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catalogueInterface } from '@interfaces/commons.interface';

@Component({
  selector: 'app-catalogues-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './catalogues-home.component.html',
  styleUrl: './catalogues-home.component.scss',
})
export class CataloguesHomeComponent implements OnInit {
  constructor(private actRouter: ActivatedRoute, private fb: FormBuilder) {}
  title: string = '';
  form: FormGroup = this.fb.group({
    name: [''],
  });
  sizeCatalogues: number = 0;
  catalogues: catalogueInterface[] = [];
  ngOnInit(): void {
    this.title = this.actRouter.snapshot.data['titleShow'];
  }
  changePagination(event: PageEvent) {}
  deleteCatalogue(catalogue: catalogueInterface) {}
  searchCatalogue() {}
  cleanForm() {
    this.form.patchValue({ name: '' });
  }
}
