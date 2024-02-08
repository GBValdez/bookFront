import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (isPlatformBrowser(this.platformId)) {
      //   // Injeccion de dependencias
      const IS_PROTECT: number = route.data['isProtect'];
      let pass: boolean = true;
      //25 significa ruta no protegida
      //20 significa ruta protegida
      //30 significa ruta protegida para usuarios no autenticados

      if (IS_PROTECT != 25) {
        if (this.authSvc.getAuth()) {
          if (route.data['roles'] == undefined) pass = IS_PROTECT == 20;
          else {
            const roles = route.data['roles'] as string[];
            const userRoles = this.authSvc.getAuth()!.roles;
            pass = roles.some((role) => userRoles.includes(role));
            pass = pass && IS_PROTECT == 20;
          }
        } else {
          pass = IS_PROTECT == 30;
        }
      }
      if (!pass) {
        if (IS_PROTECT == 20) this.router.navigate(['/home']);
        else this.router.navigate(['/books']);
      }
      return pass;
    }
    return true;
  }
}
