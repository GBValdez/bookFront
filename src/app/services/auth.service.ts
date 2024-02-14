import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { authUserInterface } from '@interfaces/auth.inteface';
import { AES, enc } from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookiesSvc: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}
  authObs: BehaviorSubject<authUserInterface | null> =
    new BehaviorSubject<authUserInterface | null>(null);

  getObservable(): Observable<authUserInterface | null> {
    return this.authObs.asObservable();
  }
  nextAuth(auth: authUserInterface | null) {
    this.authObs.next(auth);
  }

  hasAuth(): boolean {
    return this.cookiesSvc.check('auth');
  }

  setAuth(newAuth: authUserInterface) {
    const authBody = AES.encrypt(
      JSON.stringify(newAuth),
      environment.key
    ).toString();
    this.cookiesSvc.set('auth', authBody, 1);
    this.authObs.next(newAuth);
  }
  getAuth(): authUserInterface | null {
    const authBody: string = this.cookiesSvc.get('auth');
    console.log('authBody', authBody);
    const valid = authBody.trim().length > 0 && authBody != '';
    if (authBody.trim().length > 0 && authBody != '') {
      const DECRYPT_TEXT: string = AES.decrypt(
        authBody,
        environment.key
      ).toString(enc.Utf8);
      return JSON.parse(DECRYPT_TEXT);
    }
    return null;
  }
  logout() {
    if (this.hasAuth()) {
      this.cookiesSvc.delete('auth');
      this.authObs.next(null);
      this.router.navigate(['/home']);
    }
  }
}
