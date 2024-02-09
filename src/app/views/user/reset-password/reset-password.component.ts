import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  passwordEqual: ValidatorFn = (control) => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    else return { noIgual: true };
  };
  form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.passwordEqual }
  );
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  gmail: string = '';
  token: string = '';

  ngOnInit(): void {
    this.gmail = this.activateRoute.snapshot.params['gmail'];
    this.token = this.activateRoute.snapshot.params['token'];
  }
  resetPassword() {
    if (this.form.valid) {
      console.log('Reset password');
    }
  }
}
