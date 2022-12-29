import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  username = '';
  password = '';
  @Input() error: string | null;
  invalidLogin = false;

  constructor(
    public router: Router,
    public loginservice: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      (data) => {
       this.invalidLogin = false;
          this.router.navigate(['home']);
      
        // else {
        //   this.router.navigate(['admindashboard']);
        //   this.invalidLogin =false;
        // }
        
      },
      (error) => {
        this.invalidLogin = true;
        swal.fire('Error', 'Please check your credentials', 'error');
      }
    );
  }
  reloadPage(): void {
    this.router.navigate(['home']);
  }
}
