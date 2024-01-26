import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';

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
    canLoad: [],
    data: { isProtect: 30 },
  },
  {
    path: 'books',
    loadComponent: () =>
      import('@pages/book-home/book-home.component').then(
        (m) => m.BookHomeComponent
      ),
    canLoad: [],
    data: { isProtect: 20 },
  },
  {
    path: 'books/Create',
    loadComponent: () =>
      import('@pages/book-create/book-create.component').then(
        (m) => m.BookCreateComponent
      ),
  },
];
