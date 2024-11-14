import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../model/UserDetails';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
registerForm: FormGroup;
users: UserDetails[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.getUser();
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get surname() { return this.registerForm.get('surname'); }
  get password() { return this.registerForm.get('password'); }

  onSubmit() {
    if (this.registerForm.valid) {
      this.createUser(); 
      console.log('Registration successful', this.registerForm.value);
      this.router.navigate(['/home']);
    } else {
      console.log('Form is not valid');
    }
  }

  getUser(){
    this.userService.getUsers().subscribe(_users => {
      this.users = _users;
      console.log('successful created', this.users);
    })
  }

  createUser(){
    this.userService.createUser(this.registerForm.value).subscribe(_users => {
      console.log('successful created');
    })
  }
}
