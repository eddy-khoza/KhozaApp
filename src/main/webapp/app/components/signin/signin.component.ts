import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from 'app/user/user.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatSnackBarModule,CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
loginForm: FormGroup;
private loginUrl = "http://localhost:9090/api/users/login";

  constructor(private fb: FormBuilder,private http: HttpClient, private router: Router,private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
     if (this.loginForm.valid) {
           this.http.post<UserDTO>(this.loginUrl, this.loginForm.value).subscribe(
             (response) => {
               console.log('Login successful:', response);

               localStorage.setItem('firstName', response.firstName ?? '');
              localStorage.setItem('surname', response.surname ?? '');


               this.router.navigate(['/home']);
             },
             (error: HttpErrorResponse) => {
              if (error.status === 401) {
                this.snackBar.open('Invalid credentials, please try again.', 'Close', {
                  duration: 3000,
                  panelClass: ['warning-snackbar']
                });
              } else {
                console.error('Login failed:', error);
              }
            }
           );
         }
    }
}
