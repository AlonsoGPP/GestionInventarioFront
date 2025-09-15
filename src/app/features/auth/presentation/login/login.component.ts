import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError, selectIsAuthenticated, selectLoading } from '../../../../core/state/auth/auth.selectors';
import { login } from '../../../../core/state/auth';
@Component({
  selector: 'app-login',
  standalone: true,
imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
    private fb = inject(FormBuilder);
  private store = inject(Store);


  showPassword = false;

  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectAuthError);
  readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(login({
      username: this.form.value.email,
      password: this.form.value.password,
    }));

  }
  toggleVisibility() {
    this.showPassword = !this.showPassword;
  }

 }
