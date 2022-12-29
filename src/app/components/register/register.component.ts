import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MustMatch } from './confirm-equal-validator';

const baseUrl = 'http://productserviceloadbalancer-2101711574.ap-south-1.elb.amazonaws.com/user/register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

form: FormGroup;
  user = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };
  submitted = false;
  loading = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: [null, Validators.required],
        username: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  saveUser() {
    const data = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password
    };

    this.httpClient.post(baseUrl, data, { responseType: 'text' }).subscribe(
      (response) => {
        this.loading = true;
        console.log(response);
        if (response === 'Username already Taken') {
          swal.fire('Error', 'username already taken!! Try again.', 'error');
          this.submitted = false;
          this.loading = false;
        } else {
          this.loading = true;
            this.submitted = true;
            swal.fire(
              'User created',
              'Your account has been successfully created',
              'success'
            );
            this.router.navigate(['/login']);
          
        }
      },
      (error) => {
        this.loading = false;
        swal.fire('Error', 'Something went wrong!', 'error');
      }
    );
  }

}
