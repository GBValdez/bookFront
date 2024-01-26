import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from '@services/login.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { authUserInterface } from '@interfaces/auth.inteface';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private loginSvc: LoginService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  login() {
    if (this.form.valid) {
      this.loginSvc.login(this.form.value).subscribe((res) => {
        const decoded: any = jwtDecode(res.token);
        const newUser: authUserInterface = {
          token: res.token,
          expiration: res.expiration,
          email: decoded.email,
          roles:
            decoded[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ],
        };
        this.authService.auth = newUser;
        this.router.navigate(['/books']);
      });
      this.form.patchValue({ email: '', password: '' });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
