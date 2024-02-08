import { Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { UserVerifyEmailComponent } from '@pages/user/user-verify-email/user-verify-email.component';

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
    title: 'Home',
  },
  {
    path: 'books',
    loadComponent: () =>
      import('@pages/books/book-home/book-home.component').then(
        (m) => m.BookHomeComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 25 },
    title: 'Libros',
  },
  {
    path: 'books/create',
    loadComponent: () =>
      import('@pages/books/book-create/book-create.component').then(
        (m) => m.BookCreateComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20 },
    title: 'Crear libro',
  },
  {
    path: 'books/edit/:id',
    loadComponent: () =>
      import('@pages/books/book-edit/book-edit.component').then(
        (m) => m.BookEditComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20 },
    title: 'Editar libro',
  },
  {
    path: 'books/detail/:id',
    loadComponent: () =>
      import('@pages/books/book-detail/book-detail.component').then(
        (m) => m.BookDetailComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 25 },
    title: 'Detalle libro',
  },
  {
    path: 'authors',
    loadComponent: () =>
      import('@pages/author/author-home/author-home.component').then(
        (m) => m.AuthorHomeComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 25 },
    title: 'Autores',
  },
  {
    path: 'authors/create',
    loadComponent: () =>
      import('@pages/author/author-create/author-create.component').then(
        (m) => m.AuthorCreateComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20, roles: ['ADMINISTRATOR'] },
    title: 'Crear autor',
  },
  {
    path: 'authors/edit/:id',
    loadComponent: () =>
      import('@pages/author/author-edit/author-edit.component').then(
        (m) => m.AuthorEditComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 20, roles: ['ADMINISTRATOR'] },
    title: 'Editar autor',
  },
  {
    path: 'authors/detail/:id',
    loadComponent: () =>
      import('@pages/author/author-detail/author-detail.component').then(
        (m) => m.AuthorDetailComponent
      ),
    canActivate: [AuthGuard],
    data: { isProtect: 25 },
    title: 'Detalle autor',
  },
  {
    path: 'user/confirmEmail',
    component: UserVerifyEmailComponent,
    title: 'Verificar email',
    data: { isProtect: 30 },
    canActivate: [AuthGuard],
  },
];
