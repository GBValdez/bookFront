import {
  CanActivateChildFn,
  CanActivateFn,
  CanLoadFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const authGuard: CanActivateChildFn | CanActivateFn = (childRoute) => {
  // Injeccion de dependencias
  const AUTH_SERVICE: AuthService = inject(AuthService);
  const ROUTER: Router = inject(Router);
  const IS_PROTECT: number = childRoute.data['isProtect'];
  let pass: boolean = true;
  //25 significa ruta no protegida
  //20 significa ruta protegida
  //30 significa ruta protegida para usuarios no autenticados

  if (IS_PROTECT != 25) {
    if (AUTH_SERVICE.auth) {
      if (childRoute.data['roles'] == undefined) pass = IS_PROTECT == 20;
      else {
        const roles = childRoute.data['roles'] as string[];
        const userRoles = AUTH_SERVICE.auth.roles;
        pass = roles.some((role) => userRoles.includes(role));
        pass = pass && IS_PROTECT == 20;
      }
    } else {
      pass = IS_PROTECT == 30;
    }
  }
  if (!pass) {
    if (IS_PROTECT == 20) ROUTER.navigate(['/home']);
    else ROUTER.navigate(['/books']);
  }
  console.log('XDcURUCHICHE', pass);
  return pass;
};
