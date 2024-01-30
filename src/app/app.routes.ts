import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
    data: { isProtect: 30 },
  },
  {
    path: 'books',
    loadComponent: () =>
      import('@pages/books/book-home/book-home.component').then(
        (m) => m.BookHomeComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20 },
  },
  {
    path: 'books/Create',
    loadComponent: () =>
      import('@pages/books/book-create/book-create.component').then(
        (m) => m.BookCreateComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20 },
  },
  {
    path: 'authors',
    loadComponent: () =>
      import('@pages/author/author-home/author-home.component').then(
        (m) => m.AuthorHomeComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20 },
  },
  {
    path: 'authors/create',
    loadComponent: () =>
      import('@pages/author/author-create/author-create.component').then(
        (m) => m.AuthorCreateComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20, roles: ['ADMINISTRATOR'] },
  },
  {
    path: 'authors/edit/:id',
    loadComponent: () =>
      import('@pages/author/author-edit/author-edit.component').then(
        (m) => m.AuthorEditComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20, roles: ['ADMINISTRATOR'] },
  },
];
