import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environments/environment';
import { authUserInterface } from '@interfaces/auth.inteface';
import { AES, enc } from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookiesSvc: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  set auth(newAuth: authUserInterface) {
    const authBody = AES.encrypt(
      JSON.stringify(newAuth),
      environment.key
    ).toString();
    this.cookiesSvc.set('auth', authBody);
  }
  get auth(): authUserInterface | null {
    const authBody: string = this.cookiesSvc.get('auth');
    if (authBody != null && authBody != '') {
      const DECRYPT_TEXT: string = AES.decrypt(
        authBody,
        environment.key
      ).toString(enc.Utf8);
      return JSON.parse(DECRYPT_TEXT);
    }
    return null;
  }
}