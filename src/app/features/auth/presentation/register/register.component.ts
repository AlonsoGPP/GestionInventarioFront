import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthFacade } from '../../application/auth.facade';
import { Router, RouterModule } from '@angular/router';
import { RegisterUserRequest } from '../../domain';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);
  private toastService = inject(ToastService);

  showPassword = false;
  showConfirmedPassword = false;

  showError = false;
  errorMessage = '';
  alertType: 'error' | 'success' | 'info' | 'warning' = 'error';



  form = this.fb.nonNullable.group({
    user:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', Validators.required]
  }, {
    validators: this.passwordsMatchValidator
  });

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.form.valid) {

      const registerRequest: RegisterUserRequest = {
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        role: this.form.value.role ?? '',
        username: this.form.value.user ?? ''
      }

      this.authFacade.register(registerRequest)
        .pipe(
          catchError((err) => {
            console.log(err);
            const { error } = err;
            this.toastService.error(error.message);

            return throwError(() => err); 
          })
        )
        .subscribe((resp) => {
          console.log(resp);
          if(resp.status > 201){
            this.toastService.error(resp.message);

            return;
            
          }

            this.toastService.success('Se registro correctamente');

            this.router.navigateByUrl('/auth')

        })
    } else {
      this.form.markAllAsTouched();
    }
  }

 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }



 }


